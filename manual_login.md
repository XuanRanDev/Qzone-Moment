# 手动登录使用教程

手动登录于`v2.3`版本推出，适用于**扫码后选择登录却仍提示登录取消**的账号。通过浏览器手动在官方登录并提取 Cookie 信息即可完成手动登录。

## 准备
- 请使用电脑浏览器（推荐 Chrome/Edge）。
- 确保能正常访问 QQ 空间：`https://qzone.qq.com`

## 操作步骤
1. 打开 [QQ 空间](https://qzone.qq.com) 并完成登录（反正你用任意方式先登录上去）。

   ![QQ空间登录页](http://pictures.xuanran.cc/i/2026/02/06/69858eac21e02.jpg)

2. 登录成功后按 `F12` 或右键选择“检查”打开开发者工具。界面出现在右侧或语言为英文都不影响操作。

   ![打开开发者工具](http://pictures.xuanran.cc/i/2026/02/06/69858f26cdf7d.png)

3. 切换到 `Application`（应用）标签页，在左侧找到 `Cookies`，选择当前站点。

   ![选择 Cookies](http://pictures.xuanran.cc/i/2026/02/06/69858fb884fc8.png)

4. 在 Cookies 列表中搜索并找到程序要求的参数值（按名称搜索即可）。
   - p_skey
   - pt4_token
   - skey

      ![搜索所需参数](http://pictures.xuanran.cc/i/2026/02/06/6985905409c9a.png)

5. 将找到的参数值**逐项复制**到程序对应的输入框中。

   ![填写到程序中](http://pictures.xuanran.cc/i/2026/02/06/698590b5b0112.png)

6. 点击“确认登录”，程序会自动校验并提示是否成功。

   ![确认登录](http://pictures.xuanran.cc/i/2026/02/06/6985914cd4400.png)

## 常见问题
- 找不到 `Application` 标签：窗口太窄时会被折叠到 `>>` 中。
- Cookie 列表为空：确认已完成登录，并刷新一次页面后再查看。
