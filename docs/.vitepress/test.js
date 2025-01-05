import {sidebarWeekly, sidebarCases} from "./sidebar.js";


var sidebar = sidebarWeekly();
console.log(sidebar);
console.log('----------------------------')
console.log(JSON.stringify(sidebar[1]))
// console.log('----------------------------')
// console.log(JSON.stringify(sidebar))

var barCases = sidebarCases();
console.log(JSON.stringify(barCases));

/*
[
    {
        "text": "2025",
        "collapsed": false,
        "items": [
            {
                "text": "一月",
                "collapsed": false,
                "items": [
                    {
                        "text": "332期 | 西蒙·威利森的年终总结，梁文锋的访谈",
                        "link": "/weekly/issue-332"
                    }
                ]
            }
        ]
    }
]

*/