# H5 中台系统 — 作业说明与项目说明

## 概述
本仓库包含课堂作业：实现一个简单的中台管理界面样例。作业要求（见课程截图）包含三项：

1. 做一个登录页，登录成功后将 cookie 写入以标识会话，防止重复登录（提示：cookie 有过期时间）。
2. 设计一个权限管理页面，并能给用户分配权限（角色/权限分配）。
3. 做一个列表页和一个用于填写/编辑的表单页面。

下文结合本项目目录给出实现说明、运行与测试步骤、以及关键文件位置，方便查看与验证功能。

## 项目实现要点
- 登录：使用 `src/components/loginPage.tsx`（项目内命名可能为 `loginPage.tsx`）和 `src/utils/auth.ts`，在登录成功后通过 `document.cookie` 或前端工具函数写入带过期时间的 cookie，并在 App 启动或路由守卫中检查该 cookie 实现免重复登录逻辑。
- 权限管理：在 `src/components/permissionManagement.tsx` 中实现权限分配与展示，组件读取/更新后端或本地假数据的用户权限字段，并在界面上提供分配/撤销按钮。
- 列表与表单：`src/components/featureList.tsx` 提供表格展示（支持查询、分页、批量操作），`src/components/featureForm.tsx` 提供右侧或独立页面的表单用于新增/编辑条目。UI 原件集中在 `src/components/ui/` 下（如 `input.tsx`、`select.tsx`、`table.tsx`、`button.tsx` 等）。

实现细节摘要：
- 登录后 cookie 示例：设置 `token=...; Expires=...; Path=/;`，并在 `auth.ts` 中提供 `setToken/getToken/removeToken` 工具封装。
- 权限控制：在 `auth.ts` 中维护当前用户权限（本地或从后端拉取），并在需要隐藏/禁用操作按钮处基于权限进行判断。
- 列表/表单交互：列表支持行选中、批量操作、查看/编辑跳转；表单支持受控输入、验证与提交回调。

## 运行与调试
在项目目录下（H5 中台作业）运行：

```bash
npm install
npm run dev
```

默认开发服务器会在 `http://localhost:3000`（或 Vite 提示的端口）启动。浏览器打开后可按下列步骤验证功能。

## 测试与验证步骤
1. 登录流程
- 打开应用，访问登录页面，输入示例账号后提交。
- 登录成功后，检查浏览器 cookie（Application → Cookies），确认存在 `token`（或项目中使用的 cookie 名称）且有过期时间。

2. 权限分配
- 进入权限管理页面，查看已有用户及其权限。
- 给某个用户分配或撤销权限，保存后在用户侧界面验证相应操作按钮是否显示/禁用。

3. 列表与表单
- 打开功能列表页面，验证查询、排序、分页是否工作。
- 点击新增/编辑，打开表单页面或侧边表单，填写必填项并提交，返回列表并查看变更。

## 关键文件一览（便于查阅）
- 登录与鉴权： [第四课React与Next.js与H5中后台系统开发/H5中台作业/src/utils/auth.ts](第四课React与Next.js与H5中后台系统开发/H5中台作业/src/utils/auth.ts#L1)
- 登录页： [第四课React与Next.js与H5中后台系统开发/H5中台作业/src/components/loginPage.tsx](第四课React与Next.js与H5中后台系统开发/H5中台作业/src/components/loginPage.tsx#L1)
- 权限管理： [第四课React与Next.js与H5中后台系统开发/H5中台作业/src/components/permissionManagement.tsx](第四课React与Next.js与H5中后台系统开发/H5中台作业/src/components/permissionManagement.tsx#L1)
- 列表页： [第四课React与Next.js与H5中后台系统开发/H5中台作业/src/components/featureList.tsx](第四课React与Next.js与H5中后台系统开发/H5中台作业/src/components/featureList.tsx#L1)
- 表单页： [第四课React与Next.js与H5中后台系统开发/H5中台作业/src/components/featureForm.tsx](第四课React与Next.js与H5中后台系统开发/H5中台作业/src/components/featureForm.tsx#L1)
- 公共 UI： [第四课React与Next.js与H5中后台系统开发/H5中台作业/src/components/ui](第四课React与Next.js与H5中后台系统开发/H5中台作业/src/components/ui)

（如果文件名在项目中略有不同，请按实际文件名查找 `src/components` 与 `src/utils` 目录。）