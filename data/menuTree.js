/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
var jsonData = [
    {
      "path": "/",
      "name": "index",
      "component": {
        "name": "BasicLayout",
        "mixins": [
          {
            "computed": {},
            "methods": {}
          },
          {
            "computed": {},
            "methods": {}
          }
        ],
        "components": {
          "RouteView": {
            "name": "RouteView",
            "props": {
              "keepAlive": {
                "default": true
              }
            },
            "beforeCreate": [
              null
            ],
            "beforeDestroy": [
              null
            ],
            "__file": "src/layouts/RouteView.vue",
            "_Ctor": {}
          },
          "SideMenu": {
            "name": "SideMenu",
            "components": {
              "Logo": {
                "name": "Logo",
                "components": {
                  "LogoSvg": {
                    "props": {
                      "scale": {
                        "type": [
                          null,
                          null
                        ],
                        "default": 1,
                        "required": false
                      },
                      "fill": {
                        "default": "currentColor",
                        "required": false
                      }
                    },
                    "inheritAttrs": false,
                    "computed": {},
                    "_Ctor": {}
                  }
                },
                "props": {
                  "title": {
                    "default": "Ant Design Pro",
                    "required": false
                  },
                  "showTitle": {
                    "default": true,
                    "required": false
                  }
                },
                "staticRenderFns": [],
                "_compiled": true,
                "beforeCreate": [
                  null
                ],
                "beforeDestroy": [
                  null
                ],
                "__file": "src/components/tools/Logo.vue",
                "_Ctor": {}
              },
              "SMenu": {
                "name": "SMenu",
                "props": {
                  "menu": {
                    "required": true
                  },
                  "theme": {
                    "required": false,
                    "default": "dark"
                  },
                  "mode": {
                    "required": false,
                    "default": "inline"
                  },
                  "collapsed": {
                    "required": false,
                    "default": false
                  }
                },
                "computed": {},
                "watch": {},
                "methods": {},
                "_Ctor": {}
              }
            },
            "mixins": [
              {
                "computed": {},
                "methods": {}
              },
              {
                "computed": {},
                "methods": {}
              }
            ],
            "props": {
              "mode": {
                "required": false,
                "default": "inline"
              },
              "theme": {
                "required": false,
                "default": "dark"
              },
              "collapsible": {
                "required": false,
                "default": false
              },
              "collapsed": {
                "required": false,
                "default": false
              },
              "menus": {
                "required": true
              }
            },
            "methods": {},
            "staticRenderFns": [],
            "_compiled": true,
            "beforeCreate": [
              null
            ],
            "beforeDestroy": [
              null
            ],
            "__file": "src/components/Menu/SideMenu.vue",
            "_Ctor": {}
          },
          "GlobalHeader": {
            "name": "GlobalHeader",
            "components": {
              "UserMenu": {
                "name": "UserMenu",
                "components": {
                  "NoticeIcon": {
                    "name": "HeaderNotice",
                    "methods": {},
                    "staticRenderFns": [],
                    "_compiled": true,
                    "_scopeId": "data-v-7eec4d22",
                    "beforeCreate": [
                      null
                    ],
                    "beforeDestroy": [
                      null
                    ],
                    "__file": "src/components/NoticeIcon/NoticeIcon.vue",
                    "_Ctor": {}
                  }
                },
                "computed": {},
                "methods": {},
                "staticRenderFns": [],
                "_compiled": true,
                "beforeCreate": [
                  null
                ],
                "beforeDestroy": [
                  null
                ],
                "__file": "src/components/tools/UserMenu.vue",
                "_Ctor": {}
              },
              "SMenu": {
                "name": "SMenu",
                "props": {
                  "menu": {
                    "required": true
                  },
                  "theme": {
                    "required": false,
                    "default": "dark"
                  },
                  "mode": {
                    "required": false,
                    "default": "inline"
                  },
                  "collapsed": {
                    "required": false,
                    "default": false
                  }
                },
                "computed": {},
                "watch": {},
                "methods": {},
                "_Ctor": {}
              },
              "Logo": {
                "name": "Logo",
                "components": {
                  "LogoSvg": {
                    "props": {
                      "scale": {
                        "type": [
                          null,
                          null
                        ],
                        "default": 1,
                        "required": false
                      },
                      "fill": {
                        "default": "currentColor",
                        "required": false
                      }
                    },
                    "inheritAttrs": false,
                    "computed": {},
                    "_Ctor": {}
                  }
                },
                "props": {
                  "title": {
                    "default": "Ant Design Pro",
                    "required": false
                  },
                  "showTitle": {
                    "default": true,
                    "required": false
                  }
                },
                "staticRenderFns": [],
                "_compiled": true,
                "beforeCreate": [
                  null
                ],
                "beforeDestroy": [
                  null
                ],
                "__file": "src/components/tools/Logo.vue",
                "_Ctor": {}
              }
            },
            "mixins": [
              {
                "computed": {},
                "methods": {}
              }
            ],
            "props": {
              "mode": {
                "default": "sidemenu"
              },
              "menus": {
                "required": true
              },
              "theme": {
                "required": false,
                "default": "dark"
              },
              "collapsed": {
                "required": false,
                "default": false
              },
              "device": {
                "required": false,
                "default": "desktop"
              }
            },
            "methods": {},
            "beforeDestroy": [
              null,
              null
            ],
            "staticRenderFns": [],
            "_compiled": true,
            "beforeCreate": [
              null
            ],
            "__file": "src/components/GlobalHeader/GlobalHeader.vue",
            "_Ctor": {}
          },
          "GlobalFooter": {
            "name": "GlobalFooter",
            "staticRenderFns": [],
            "_compiled": true,
            "_scopeId": "data-v-38e8cf0f",
            "beforeCreate": [
              null
            ],
            "beforeDestroy": [
              null
            ],
            "__file": "src/components/GlobalFooter/GlobalFooter.vue",
            "_Ctor": {}
          },
          "SettingDrawer": {
            "components": {
              "DetailList": {
                "name": "DetailList",
                "Item": {
                  "name": "DetailListItem",
                  "props": {
                    "term": {
                      "default": "",
                      "required": false
                    }
                  },
                  "inject": {
                    "col": {}
                  }
                },
                "components": {
                  "Col": {
                    "name": "ACol",
                    "props": {
                      "span": {
                        "type": [
                          null,
                          null
                        ]
                      },
                      "order": {
                        "type": [
                          null,
                          null
                        ]
                      },
                      "offset": {
                        "type": [
                          null,
                          null
                        ]
                      },
                      "push": {
                        "type": [
                          null,
                          null
                        ]
                      },
                      "pull": {
                        "type": [
                          null,
                          null
                        ]
                      },
                      "xs": {},
                      "sm": {},
                      "md": {},
                      "lg": {},
                      "xl": {},
                      "xxl": {},
                      "prefixCls": {}
                    },
                    "inject": {
                      "configProvider": {
                        "from": "configProvider"
                      },
                      "rowContext": {
                        "from": "rowContext"
                      }
                    },
                    "_Ctor": {}
                  }
                },
                "props": {
                  "title": {
                    "default": "",
                    "required": false
                  },
                  "col": {
                    "required": false,
                    "default": 3
                  },
                  "size": {
                    "required": false,
                    "default": "large"
                  },
                  "layout": {
                    "required": false,
                    "default": "horizontal"
                  }
                },
                "staticRenderFns": [],
                "_compiled": true,
                "_scopeId": "data-v-4ae1a4c5",
                "beforeCreate": [
                  null
                ],
                "beforeDestroy": [
                  null
                ],
                "__file": "src/components/DescriptionList/DescriptionList.vue"
              },
              "SettingItem": {
                "name": "SettingItem",
                "props": {
                  "title": {
                    "default": ""
                  },
                  "divider": {
                    "default": false
                  }
                },
                "staticRenderFns": [],
                "_compiled": true,
                "_scopeId": "data-v-67a78d35",
                "beforeCreate": [
                  null
                ],
                "beforeDestroy": [
                  null
                ],
                "__file": "src/components/SettingDrawer/SettingItem.vue"
              }
            },
            "mixins": [
              {
                "computed": {},
                "methods": {}
              },
              {
                "computed": {},
                "methods": {}
              }
            ],
            "watch": {},
            "methods": {},
            "staticRenderFns": [],
            "_compiled": true,
            "_scopeId": "data-v-06065cda",
            "beforeCreate": [
              null
            ],
            "beforeDestroy": [
              null
            ],
            "__file": "src/components/SettingDrawer/SettingDrawer.vue",
            "_Ctor": {}
          }
        },
        "computed": {},
        "watch": {},
        "methods": {},
        "staticRenderFns": [],
        "_compiled": true,
        "beforeCreate": [
          null
        ],
        "beforeDestroy": [
          null
        ],
        "__file": "src/layouts/BasicLayout.vue",
        "_Ctor": {}
      },
      "meta": {
        "title": "首页"
      },
      "redirect": "/dashboard/workplace",
      "children": [
        {
          "path": "dashboard",
          "name": "dashboard",
          "redirect": "/dashboard/workplace",
          "component": {
            "name": "RouteView",
            "props": {
              "keepAlive": {
                "default": true
              }
            },
            "beforeCreate": [
              null
            ],
            "beforeDestroy": [
              null
            ],
            "__file": "src/layouts/RouteView.vue",
            "_Ctor": {}
          },
          "meta": {
            "title": "仪表盘",
            "keepAlive": true,
            "icon": {
              "props": {
                "scale": {
                  "type": [
                    null,
                    null
                  ],
                  "default": 1,
                  "required": false
                },
                "fill": {
                  "default": "currentColor",
                  "required": false
                }
              },
              "inheritAttrs": false,
              "computed": {}
            },
            "permission": [
              "dashboard"
            ]
          },
          "children": [
            {
              "path": "analysis/:pageNo([1-9]\\d*)?",
              "name": "Analysis",
              "meta": {
                "title": "分析页",
                "keepAlive": false,
                "permission": [
                  "dashboard"
                ]
              }
            },
            {
              "path": "https://www.baidu.com/",
              "name": "Monitor",
              "meta": {
                "title": "监控页（外部）",
                "target": "_blank"
              }
            },
            {
              "path": "workplace",
              "name": "Workplace",
              "meta": {
                "title": "工作台",
                "keepAlive": true,
                "permission": [
                  "dashboard"
                ]
              }
            },
            {
              "path": "test-work",
              "name": "TestWork",
              "meta": {
                "title": "测试功能",
                "keepAlive": true,
                "permission": [
                  "dashboard"
                ]
              }
            }
          ]
        },
        {
          "path": "/form",
          "redirect": "/form/base-form",
          "component": {
            "name": "PageView",
            "components": {
              "PageHeader": {
                "name": "PageHeader",
                "components": {
                  "s-breadcrumb": {
                    "methods": {},
                    "watch": {},
                    "staticRenderFns": [],
                    "_compiled": true,
                    "_scopeId": "data-v-31510532",
                    "beforeCreate": [
                      null
                    ],
                    "beforeDestroy": [
                      null
                    ],
                    "__file": "src/components/tools/Breadcrumb.vue",
                    "_Ctor": {}
                  }
                },
                "props": {
                  "title": {
                    "type": [
                      null,
                      null
                    ],
                    "default": true,
                    "required": false
                  },
                  "logo": {
                    "default": "",
                    "required": false
                  },
                  "avatar": {
                    "default": "",
                    "required": false
                  }
                },
                "staticRenderFns": [],
                "_compiled": true,
                "_scopeId": "data-v-58ab548f",
                "beforeCreate": [
                  null
                ],
                "beforeDestroy": [
                  null
                ],
                "__file": "src/components/PageHeader/PageHeader.vue",
                "_Ctor": {}
              }
            },
            "props": {
              "avatar": {
                "default": null
              },
              "title": {
                "type": [
                  null,
                  null
                ],
                "default": true
              },
              "logo": {
                "default": null
              },
              "directTabs": {
                "default": null
              }
            },
            "computed": {},
            "methods": {},
            "staticRenderFns": [],
            "_compiled": true,
            "_scopeId": "data-v-07175cda",
            "beforeCreate": [
              null
            ],
            "beforeDestroy": [
              null
            ],
            "__file": "src/layouts/PageView.vue",
            "_Ctor": {}
          },
          "meta": {
            "title": "表单页",
            "icon": "form",
            "permission": [
              "form"
            ]
          },
          "children": [
            {
              "path": "/form/base-form",
              "name": "BaseForm",
              "meta": {
                "title": "基础表单",
                "keepAlive": true,
                "permission": [
                  "form"
                ]
              }
            },
            {
              "path": "/form/step-form",
              "name": "StepForm",
              "meta": {
                "title": "分步表单",
                "keepAlive": true,
                "permission": [
                  "form"
                ]
              }
            },
            {
              "path": "/form/advanced-form",
              "name": "AdvanceForm",
              "meta": {
                "title": "高级表单",
                "keepAlive": true,
                "permission": [
                  "form"
                ]
              }
            }
          ]
        },
        {
          "path": "/list",
          "name": "list",
          "component": {
            "name": "PageView",
            "components": {
              "PageHeader": {
                "name": "PageHeader",
                "components": {
                  "s-breadcrumb": {
                    "methods": {},
                    "watch": {},
                    "staticRenderFns": [],
                    "_compiled": true,
                    "_scopeId": "data-v-31510532",
                    "beforeCreate": [
                      null
                    ],
                    "beforeDestroy": [
                      null
                    ],
                    "__file": "src/components/tools/Breadcrumb.vue",
                    "_Ctor": {}
                  }
                },
                "props": {
                  "title": {
                    "type": [
                      null,
                      null
                    ],
                    "default": true,
                    "required": false
                  },
                  "logo": {
                    "default": "",
                    "required": false
                  },
                  "avatar": {
                    "default": "",
                    "required": false
                  }
                },
                "staticRenderFns": [],
                "_compiled": true,
                "_scopeId": "data-v-58ab548f",
                "beforeCreate": [
                  null
                ],
                "beforeDestroy": [
                  null
                ],
                "__file": "src/components/PageHeader/PageHeader.vue",
                "_Ctor": {}
              }
            },
            "props": {
              "avatar": {
                "default": null
              },
              "title": {
                "type": [
                  null,
                  null
                ],
                "default": true
              },
              "logo": {
                "default": null
              },
              "directTabs": {
                "default": null
              }
            },
            "computed": {},
            "methods": {},
            "staticRenderFns": [],
            "_compiled": true,
            "_scopeId": "data-v-07175cda",
            "beforeCreate": [
              null
            ],
            "beforeDestroy": [
              null
            ],
            "__file": "src/layouts/PageView.vue",
            "_Ctor": {}
          },
          "redirect": "/list/table-list",
          "meta": {
            "title": "列表页",
            "icon": "table",
            "permission": [
              "table"
            ]
          },
          "children": [
            {
              "path": "/list/table-list/:pageNo([1-9]\\d*)?",
              "name": "TableListWrapper",
              "hideChildrenInMenu": true,
              "meta": {
                "title": "查询表格",
                "keepAlive": true,
                "permission": [
                  "table"
                ]
              }
            },
            {
              "path": "/list/basic-list",
              "name": "BasicList",
              "meta": {
                "title": "标准列表",
                "keepAlive": true,
                "permission": [
                  "table"
                ]
              }
            },
            {
              "path": "/list/card",
              "name": "CardList",
              "meta": {
                "title": "卡片列表",
                "keepAlive": true,
                "permission": [
                  "table"
                ]
              }
            },
            {
              "path": "/list/search",
              "name": "SearchList",
              "redirect": "/list/search/article",
              "meta": {
                "title": "搜索列表",
                "keepAlive": true,
                "permission": [
                  "table"
                ]
              },
              "children": [
                {
                  "path": "/list/search/article",
                  "name": "SearchArticles",
                  "meta": {
                    "title": "搜索列表（文章）",
                    "permission": [
                      "table"
                    ]
                  }
                },
                {
                  "path": "/list/search/project",
                  "name": "SearchProjects",
                  "meta": {
                    "title": "搜索列表（项目）",
                    "permission": [
                      "table"
                    ]
                  }
                },
                {
                  "path": "/list/search/application",
                  "name": "SearchApplications",
                  "meta": {
                    "title": "搜索列表（应用）",
                    "permission": [
                      "table"
                    ]
                  }
                }
              ]
            }
          ]
        },
        {
          "path": "/profile",
          "name": "profile",
          "component": {
            "name": "RouteView",
            "props": {
              "keepAlive": {
                "default": true
              }
            },
            "beforeCreate": [
              null
            ],
            "beforeDestroy": [
              null
            ],
            "__file": "src/layouts/RouteView.vue",
            "_Ctor": {}
          },
          "redirect": "/profile/basic",
          "meta": {
            "title": "详情页",
            "icon": "profile",
            "permission": [
              "profile"
            ]
          },
          "children": [
            {
              "path": "/profile/basic",
              "name": "ProfileBasic",
              "meta": {
                "title": "基础详情页",
                "permission": [
                  "profile"
                ]
              }
            },
            {
              "path": "/profile/advanced",
              "name": "ProfileAdvanced",
              "meta": {
                "title": "高级详情页",
                "permission": [
                  "profile"
                ]
              }
            }
          ]
        },
        {
          "path": "/result",
          "name": "result",
          "component": {
            "name": "PageView",
            "components": {
              "PageHeader": {
                "name": "PageHeader",
                "components": {
                  "s-breadcrumb": {
                    "methods": {},
                    "watch": {},
                    "staticRenderFns": [],
                    "_compiled": true,
                    "_scopeId": "data-v-31510532",
                    "beforeCreate": [
                      null
                    ],
                    "beforeDestroy": [
                      null
                    ],
                    "__file": "src/components/tools/Breadcrumb.vue",
                    "_Ctor": {}
                  }
                },
                "props": {
                  "title": {
                    "type": [
                      null,
                      null
                    ],
                    "default": true,
                    "required": false
                  },
                  "logo": {
                    "default": "",
                    "required": false
                  },
                  "avatar": {
                    "default": "",
                    "required": false
                  }
                },
                "staticRenderFns": [],
                "_compiled": true,
                "_scopeId": "data-v-58ab548f",
                "beforeCreate": [
                  null
                ],
                "beforeDestroy": [
                  null
                ],
                "__file": "src/components/PageHeader/PageHeader.vue",
                "_Ctor": {}
              }
            },
            "props": {
              "avatar": {
                "default": null
              },
              "title": {
                "type": [
                  null,
                  null
                ],
                "default": true
              },
              "logo": {
                "default": null
              },
              "directTabs": {
                "default": null
              }
            },
            "computed": {},
            "methods": {},
            "staticRenderFns": [],
            "_compiled": true,
            "_scopeId": "data-v-07175cda",
            "beforeCreate": [
              null
            ],
            "beforeDestroy": [
              null
            ],
            "__file": "src/layouts/PageView.vue",
            "_Ctor": {}
          },
          "redirect": "/result/success",
          "meta": {
            "title": "结果页",
            "icon": "check-circle-o",
            "permission": [
              "result"
            ]
          },
          "children": [
            {
              "path": "/result/success",
              "name": "ResultSuccess",
              "meta": {
                "title": "成功",
                "keepAlive": false,
                "hiddenHeaderContent": true,
                "permission": [
                  "result"
                ]
              }
            },
            {
              "path": "/result/fail",
              "name": "ResultFail",
              "meta": {
                "title": "失败",
                "keepAlive": false,
                "hiddenHeaderContent": true,
                "permission": [
                  "result"
                ]
              }
            }
          ]
        },
        {
          "path": "/exception",
          "name": "exception",
          "component": {
            "name": "RouteView",
            "props": {
              "keepAlive": {
                "default": true
              }
            },
            "beforeCreate": [
              null
            ],
            "beforeDestroy": [
              null
            ],
            "__file": "src/layouts/RouteView.vue",
            "_Ctor": {}
          },
          "redirect": "/exception/403",
          "meta": {
            "title": "异常页",
            "icon": "warning",
            "permission": [
              "exception"
            ]
          },
          "children": [
            {
              "path": "/exception/403",
              "name": "Exception403",
              "meta": {
                "title": "403",
                "permission": [
                  "exception"
                ]
              }
            },
            {
              "path": "/exception/404",
              "name": "Exception404",
              "meta": {
                "title": "404",
                "permission": [
                  "exception"
                ]
              }
            },
            {
              "path": "/exception/500",
              "name": "Exception500",
              "meta": {
                "title": "500",
                "permission": [
                  "exception"
                ]
              }
            }
          ]
        },
        {
          "path": "/account",
          "component": {
            "name": "RouteView",
            "props": {
              "keepAlive": {
                "default": true
              }
            },
            "beforeCreate": [
              null
            ],
            "beforeDestroy": [
              null
            ],
            "__file": "src/layouts/RouteView.vue",
            "_Ctor": {}
          },
          "redirect": "/account/center",
          "name": "account",
          "meta": {
            "title": "个人页",
            "icon": "user",
            "keepAlive": true,
            "permission": [
              "user"
            ]
          },
          "children": [
            {
              "path": "/account/center",
              "name": "center",
              "meta": {
                "title": "个人中心",
                "keepAlive": true,
                "permission": [
                  "user"
                ]
              }
            },
            {
              "path": "/account/settings",
              "name": "settings",
              "meta": {
                "title": "个人设置",
                "hideHeader": true,
                "permission": [
                  "user"
                ]
              },
              "redirect": "/account/settings/base",
              "hideChildrenInMenu": true,
              "children": [
                {
                  "path": "/account/settings/base",
                  "name": "BaseSettings",
                  "meta": {
                    "title": "基本设置",
                    "hidden": true,
                    "permission": [
                      "user"
                    ]
                  }
                },
                {
                  "path": "/account/settings/security",
                  "name": "SecuritySettings",
                  "meta": {
                    "title": "安全设置",
                    "hidden": true,
                    "keepAlive": true,
                    "permission": [
                      "user"
                    ]
                  }
                },
                {
                  "path": "/account/settings/custom",
                  "name": "CustomSettings",
                  "meta": {
                    "title": "个性化设置",
                    "hidden": true,
                    "keepAlive": true,
                    "permission": [
                      "user"
                    ]
                  }
                },
                {
                  "path": "/account/settings/binding",
                  "name": "BindingSettings",
                  "meta": {
                    "title": "账户绑定",
                    "hidden": true,
                    "keepAlive": true,
                    "permission": [
                      "user"
                    ]
                  }
                },
                {
                  "path": "/account/settings/notification",
                  "name": "NotificationSettings",
                  "meta": {
                    "title": "新消息通知",
                    "hidden": true,
                    "keepAlive": true,
                    "permission": [
                      "user"
                    ]
                  }
                }
              ]
            }
          ]
        },
        {
          "path": "/other",
          "name": "otherPage",
          "component": {
            "name": "PageView",
            "components": {
              "PageHeader": {
                "name": "PageHeader",
                "components": {
                  "s-breadcrumb": {
                    "methods": {},
                    "watch": {},
                    "staticRenderFns": [],
                    "_compiled": true,
                    "_scopeId": "data-v-31510532",
                    "beforeCreate": [
                      null
                    ],
                    "beforeDestroy": [
                      null
                    ],
                    "__file": "src/components/tools/Breadcrumb.vue",
                    "_Ctor": {}
                  }
                },
                "props": {
                  "title": {
                    "type": [
                      null,
                      null
                    ],
                    "default": true,
                    "required": false
                  },
                  "logo": {
                    "default": "",
                    "required": false
                  },
                  "avatar": {
                    "default": "",
                    "required": false
                  }
                },
                "staticRenderFns": [],
                "_compiled": true,
                "_scopeId": "data-v-58ab548f",
                "beforeCreate": [
                  null
                ],
                "beforeDestroy": [
                  null
                ],
                "__file": "src/components/PageHeader/PageHeader.vue",
                "_Ctor": {}
              }
            },
            "props": {
              "avatar": {
                "default": null
              },
              "title": {
                "type": [
                  null,
                  null
                ],
                "default": true
              },
              "logo": {
                "default": null
              },
              "directTabs": {
                "default": null
              }
            },
            "computed": {},
            "methods": {},
            "staticRenderFns": [],
            "_compiled": true,
            "_scopeId": "data-v-07175cda",
            "beforeCreate": [
              null
            ],
            "beforeDestroy": [
              null
            ],
            "__file": "src/layouts/PageView.vue",
            "_Ctor": {}
          },
          "meta": {
            "title": "其他组件",
            "icon": "slack",
            "permission": [
              "dashboard"
            ]
          },
          "redirect": "/other/icon-selector",
          "children": [
            {
              "path": "/other/icon-selector",
              "name": "TestIconSelect",
              "meta": {
                "title": "IconSelector",
                "icon": "tool",
                "keepAlive": true,
                "permission": [
                  "dashboard"
                ]
              }
            },
            {
              "path": "/other/list",
              "component": {
                "name": "RouteView",
                "props": {
                  "keepAlive": {
                    "default": true
                  }
                },
                "beforeCreate": [
                  null
                ],
                "beforeDestroy": [
                  null
                ],
                "__file": "src/layouts/RouteView.vue",
                "_Ctor": {}
              },
              "meta": {
                "title": "业务布局",
                "icon": "layout",
                "permission": [
                  "support"
                ]
              },
              "redirect": "/other/list/tree-list",
              "children": [
                {
                  "path": "/other/list/tree-list",
                  "name": "TreeList",
                  "meta": {
                    "title": "树目录表格",
                    "keepAlive": true
                  }
                },
                {
                  "path": "/other/list/edit-table",
                  "name": "EditList",
                  "meta": {
                    "title": "内联编辑表格",
                    "keepAlive": true
                  }
                },
                {
                  "path": "/other/list/user-list",
                  "name": "UserList",
                  "meta": {
                    "title": "用户列表",
                    "keepAlive": true
                  }
                },
                {
                  "path": "/other/list/role-list",
                  "name": "RoleList",
                  "meta": {
                    "title": "角色列表",
                    "keepAlive": true
                  }
                },
                {
                  "path": "/other/list/system-role",
                  "name": "SystemRole",
                  "meta": {
                    "title": "角色列表2",
                    "keepAlive": true
                  }
                },
                {
                  "path": "/other/list/permission-list",
                  "name": "PermissionList",
                  "meta": {
                    "title": "权限列表",
                    "keepAlive": true
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "path": "*",
      "redirect": "/404",
      "hidden": true
    }
  ]