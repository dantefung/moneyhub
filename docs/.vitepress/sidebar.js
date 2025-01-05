
import fs from 'fs'
import path from 'path'


/*
{
    "2018": {
        "十二月": [
            [
                "小说家的时代，永远地过去了",
                "issue-37"
            ],
            [
                "程序员将来会不会过剩？",
                "issue-36"
            ]
        ]
    },
    "2025": {
        "一月": [
            [
                "西蒙·威利森的年终总结，梁文锋的访谈",
                "issue-332"
            ]
        ]
    }
}

*/
function _convertParseWeeklyReadme() {
  const content = fs.readFileSync('./scripts/weekly.json', 'utf8').toString()
  const tree = JSON.parse(content)
//   const config = [];
  let config = [];
  for (let year in tree) {
    const monthItems = [];
    for (let month in tree[year]) {
      const items = [];
      for (let issue of tree[year][month]) {
        items.push({
          text: issue[1].split('-')[1] + '期 | ' + issue[0],
          link: `/weekly/${issue[1]}`
        });
      }
      monthItems.push({
        text: month,
        collapsed: true,
        items: items
      });
    }
    config.push({
      text: year,
      collapsed: true,
      items: monthItems
    });
  }

  config.reverse();
  config[0].collapsed = false;
  config[0].items[0].collapsed = false;
//   console.log(JSON.stringify(config));
  return config;
}

function sidebarWeekly() {
  return _convertParseWeeklyReadme();
}

// function sidebarCases() {
//     let config = [];

//     // 商业案例
//     config.push({
//         text: '商业案例',
//         collapsed: false,
//         items: [
//             {
//                 text: '测试分类',
//                 items: [
//                     {
//                         text: '红包封面玩法',
//                         link: '/md/cases/red-packet-cover/red-packet-cover'
//                     }
//                 ]
//             },
//         ]
//     });

//     console.log(JSON.stringify(config));
//     return config;
// }



function readMarkdownFiles(dir, parentPath = '') {
    const files = fs.readdirSync(dir).filter(file => !file.startsWith('index'));
    const markdownFiles = [];
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const relativePath = path.join(parentPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        markdownFiles.push(...readMarkdownFiles(filePath, relativePath));
      } else if (path.extname(file).toLowerCase() === '.md') {
        markdownFiles.push(relativePath);
      }
    });
    // 文件名自然排序
    markdownFiles.sort((a, b) => {
      const aName = path.basename(a, '.md');
      const bName = path.basename(b, '.md');
      return aName.localeCompare(bName);
    });
    return markdownFiles;
  }
  
  function extractTitle(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const titleMatch = content.match(/^#\s+(.*)/m);
    return titleMatch ? titleMatch[1] : path.basename(filePath, '.md');
  }
  
  function generateSidebar(dir, linkPrefix) {
    const markdownFiles = readMarkdownFiles(dir);
    const sidebarConfig = [];
  
    // 自然排序
    // markdownFiles.sort((a, b) => {
    //   const aTitle = extractTitle(a);
    //   const bTitle = extractTitle(b);
    //   return aTitle.localeCompare(bTitle, 'zh-CN', { sensitivity: 'base' });
    // });

    markdownFiles.forEach(file => {
      const filePath = path.join(dir, file).replace(/\\/g, '/');
      const title = extractTitle(filePath);
    //   const link = `/md/cases/${file.replace('.md', '')}`;
      const link = linkPrefix + `${file.replace('.md', '')}`;
      file = file.replace(/\\/g, '/');
      const parts = file.split('/');
      let currentLevel = sidebarConfig;
  
      console.log(parts);
      //遍历 parts 数组：parts 数组包含了文件路径中的每一级目录和文件名。
      parts.forEach((part, index) => {
        // 处理最后一级：
        // xhs-xxx.md
        if (index === parts.length - 1) {
          currentLevel.push({
            text: title,
            link: link
          });
        } else {// 处理中间层级
              /*
                  对于中间层级，检查当前层级是否已经存在对应的目录项，如果存在则进入该目录项；
                  如果不存在则创建新的目录项并进入该目录项。
              */
              // category1/case-1.md
              // parts : ['category1', 'case-1.md']
              let found = false;
              for (let item of currentLevel) {
                  // part === 'category1'
                  if (item.text === part) {
                      currentLevel = item.items;
                      found = true;
                      break;
                  }
              }
              // category2/subcategory1/case-3.md
              // ['category2', 'subcategory1', 'case-3.md']
              if (!found) {
                  const newItem = {
                      // 'category2' 或 'subcategory1'
                      collapsed: true,
                      text: part,
                      collapsed: true,
                      items: []
                  };
                  currentLevel.push(newItem);
                  currentLevel = newItem.items;
              }
          }
      });
    });
  
    console.log('----------cases----------');
    console.log(JSON.stringify(sidebarConfig));
    return sidebarConfig;
  }
  
function sidebarCases() {
    const dir = path.join(__dirname, '../md/cases');
    return generateSidebar(dir, '/md/cases/');
}

function sidebarBusiness() {
    const dir = path.join(__dirname, '../md/business');
    return generateSidebar(dir, '/md/business/');
}
// function sidebarBusiness() {
//     let config = [];
//     // 商业思维
//     config.push({
//         text: '商业思维',
//         collapsed: true,
//         items: [
//             {
//                 text: '测试分类',
//                 items: [
//                     {
//                         text: '一人公司方法论',
//                         link: '/md/business/一人公司方法论'
//                     }
//                 ]
//             },
//             {
//                 text: '测试分类2',
//                 items: [
//                     {
//                         text: '测试文章',
//                         link: '/md/business/issue-1'
//                     }
//                 ]
//             },
//         ]
//     });

//     // 商业案例
//     console.log(JSON.stringify(config));
//     return config;
// }

// export default sidebarWeekly;
export { sidebarWeekly, sidebarBusiness, sidebarCases };