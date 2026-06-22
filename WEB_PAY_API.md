# QQ空间时光机 - Web端支付接口文档

## 基础信息

- **Base URL**: `https://qzone.xuanran.cc`（根据实际部署环境调整）
- **认证方式**: HMAC-SHA256 签名验证
- **Content-Type**: `application/json`

---

## 接口：查询授权状态 / 创建支付单

### 请求

```
POST /app-api/bus/qzone/web-pay
```

#### 请求体

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `qq` | String | 是 | QQ号码 |
| `timestamp` | Long | 是 | 当前时间戳（毫秒），与服务器时间差不超过 ~51 分钟 |
| `signature` | String | 是 | HMAC-SHA256 签名，算法见下方 |

#### 签名算法

```
待签名数据 = "{qq}|{timestamp}"
signature = Base64Url(无填充)( HMAC-SHA256(待签名数据, SECRET_KEY) )
```

- **SECRET_KEY**: `QZONE_WEB_2026_XR`

---

### 响应

#### 已授权（已支付）

```json
{
  "code": 0,
  "data": {
    "paid": true,
    "message": "已授权",
    "payOrderId": null,
    "payDisplayMode": null,
    "payDisplayContent": null
  },
  "msg": "success"
}
```

#### 未授权（需支付）

```json
{
  "code": 0,
  "data": {
    "paid": false,
    "message": "未授权，请先支付",
    "payOrderId": 12345,
    "payDisplayMode": "url",
    "payDisplayContent": "https://openapi.alipay.com/gateway.do?..."
  },
  "msg": "success"
}
```

| 字段 | 说明 |
|------|------|
| `paid` | `true` = 已授权，`false` = 未授权 |
| `payOrderId` | 支付单ID，未授权时返回 |
| `payDisplayMode` | 支付展示模式，目前为 `"url"` |
| `payDisplayContent` | 支付链接，`payDisplayMode=url` 时为跳转URL |

#### 错误响应

```json
{
  "code": 1020001001,
  "data": null,
  "msg": "系统错误"
}
```

常见错误：
| code | 说明 |
|------|------|
| `1020001001` | 签名验证失败 / 时间戳过期 |

---