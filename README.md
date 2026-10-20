# Garibar

Admin dashboard for cargo orders: list, filter, create, update, and delete. Built with React, TypeScript, Vite, Ant Design, TanStack Query, and React Hook Form.

---

## English

### How to install and run

Requirements: **Node.js 20+** and npm.

```bash
npm install
npm run dev
```

The app starts at `http://localhost:5173`.

Other scripts:

```bash
npm run build    # typecheck + production build
npm run preview  # serve the production build
npm run lint     # ESLint
```

Open `/` for the cargo dashboard. Filters are stored in the URL, for example:

```
/?status=open&originCity=Tehran&search=steel
```

### How `mockApi.js` is used

`src/mock/mockApi.js` is treated as the backend. It is **not edited**. Typed contracts live in `src/mock/mockApi.d.ts`.

UI never calls the mock directly. Each operation has a service layer:

| Action         | Service                         | Mock function      |
| -------------- | ------------------------------- | ------------------ |
| List + filters | `get-cargo-orders.service.ts`   | `getCargoOrders`   |
| Create         | `create-cargo-order.service.ts` | `createCargoOrder` |
| Update         | `update-cargo-order.service.ts` | `updateCargoOrder` |
| Delete         | `delete-cargo-order.service.ts` | `deleteCargoOrder` |

Most backends use **snake_case**. The frontend stays **camelCase** so the UI and TypeScript stay consistent and readable. Incoming payloads are converted with `camelcase-keys`; outgoing payloads are converted back with `snakecase-keys`. This is a cheap, in-memory map — it does not add a real processing bottleneck.

TanStack Query wraps those services (`queryOptions` / `mutationOptions`). After create, update, or delete, the orders query is invalidated so the table refreshes.

### Assumptions and choices

- **Mock is the API.** A later real HTTP client can replace the service body without changing forms or tables.
- **URL is the source of truth for filters.** Status, origin city, and goods search stay shareable and survive refresh. Goods search is debounced (~400ms) so typing does not flood requests or history (`replace: true`).
- **Feature folders.** Dashboard is split into `api` / `model` / `ui`. Create, update, and delete each have their own modal so flows stay independent.
- **Zod + React Hook Form.** Validation happens before submit. Weight and price must be positive; origin and destination cannot be the same.
- **Separate loading / error / empty UI.** The table should not flash a blank page. Loading uses a skeleton that matches the table. Empty state changes copy when filters are active.
- **Pagination is included.** The list response already has `page`, `perPage`, and `total`, and the table shows pagination.
- **Axios is installed but unused.** Ready for a real backend; the mock is in-process, so there is no HTTP call today.

### How long it took

About **3 hours**.

### Where AI (Cursor) was used

Cursor was used in two places only:

1. **Design.** There was no design file. The goal of the assignment was structure and code, so AI was used to polish the visual UI.
2. **`mockApi.d.ts` and this README.** AI was used to type `mockApi.d.ts` against the read-only `mockApi.js`, and to translate and tighten this Markdown file.

### What I would add with more time

- Auth, roles, and a real API client (swap mock services for Axios)
- Optimistic updates. Everything is local right now, so they were not needed. On a real backend I would update the cache immediately and roll back on error.
- Tests for filters, form schema, and mutations
- query error boundaries that are less ad-hoc
- Optional description field on create/edit (the mock already supports it)
- Better accessibility on the table and dialogs

---

## فارسی

### نصب و اجرا

نیازمندی: **Node.js 20+** و npm.

```bash
npm install
npm run dev
```

اپ روی `http://localhost:5173` بالا می‌آید.

اسکریپت‌های دیگر:

```bash
npm run build    # تایپ‌چک و بیلد پروداکشن
npm run preview  # سرو کردن بیلد
npm run lint     # ESLint
```

داشبورد بار در مسیر `/` است. فیلترها در URL ذخیره می‌شوند؛ مثلاً:

```
/?status=open&originCity=Tehran&search=steel
```

### استفاده از `mockApi.js`

`src/mock/mockApi.js` نقش بک‌اند را دارد و **ویرایش نشده**. قرارداد تایپی آن در `src/mock/mockApi.d.ts` است.

UI مستقیم به mock وصل نیست. هر عملیات یک لایه service دارد:

| عملیات       | سرویس                           | تابع mock          |
| ------------ | ------------------------------- | ------------------ |
| لیست و فیلتر | `get-cargo-orders.service.ts`   | `getCargoOrders`   |
| ساخت         | `create-cargo-order.service.ts` | `createCargoOrder` |
| ویرایش       | `update-cargo-order.service.ts` | `updateCargoOrder` |
| حذف          | `delete-cargo-order.service.ts` | `deleteCargoOrder` |

اکثر بک‌اندها **snake_case** می‌فرستند. فرانت برای یکدست و تمیز ماندن همیشه به **camelCase** تبدیل می‌شود. این کار سرعت را کم نمی‌کند و پردازش سنگینی نیست؛ فقط یک نگاشت سبک در حافظه است (`camelcase-keys` هنگام دریافت، `snakecase-keys` هنگام ارسال به بک‌اند).

TanStack Query روی همین سرویس‌ها سوار است. بعد از ساخت، ویرایش یا حذف، کوئری لیست invalidate می‌شود تا جدول به‌روز شود.

### فرض‌ها و دلیل انتخاب‌ها

- **mock همان API است.** بعداً می‌توان بدنه service را با HTTP عوض کرد، بدون دست زدن به فرم و جدول.
- **منبع حقیقت فیلترها URL است.** وضعیت، شهر مبدأ و جستجوی کالا قابل اشتراک و پایدار بعد از رفرش می‌مانند. جستجوی کالا حدود ۴۰۰ms debounce دارد تا درخواست و تاریخچه مرورگر شلوغ نشود (`replace: true`).
- **پوشه‌بندی فیچر.** داشبورد به `api` / `model` / `ui` تقسیم شده. مودال ساخت، ویرایش و حذف جدا هستند تا جریان‌ها قاطی نشوند.
- **Zod و React Hook Form.** ولیدیشن قبل از ارسال است. وزن و قیمت باید مثبت باشند؛ مبدأ و مقصد نباید یکی باشند.
- **UI جدا برای لودینگ، خطا و خالی.** اسکلتون شکل جدول را حفظ می‌کند. متن empty وقتی فیلتر فعال است عوض می‌شود.
- **صفحه‌بندی وجود دارد.** پاسخ لیست `page`، `perPage` و `total` دارد و جدول pagination نشان می‌دهد.
- **Axios نصب است ولی استفاده نشده.** برای بک‌اند واقعی آماده است؛ فعلاً mock داخل خود اپ است و درخواست HTTP ندارد.

### مدت زمان

حدود **۳ ساعت**.

### کجا از AI (Cursor) استفاده شد

از Cursor فقط در ۲ مورد استفاده شد:

1. **دیزاین.** فایل دیزاین وجود نداشت و هدف تمرین استراکچر و کد بود؛ AI فقط برای پرداخت ظاهر UI استفاده شد.
2. **`mockApi.d.ts` و همین README.** برای هم‌تراز کردن تایپ‌ها با `mockApi.js` (غیرقابل ویرایش)، و برای ترجمه و بهینه‌سازی این فایل Markdown.

### اگر وقت بیشتری بود

- احراز هویت، نقش‌ها و کلاینت واقعی API به‌جای mock
- Optimistic updates. فعلاً همه چیز لوکال است و نیازی نبود؛ اگر بک‌اند واقعی بود، کش را همان لحظه عوض می‌کردم و در خطا برمی‌گرداندم.
- تست برای فیلتر، اسکیما فرم و mutationها
- مدیریت خطای یکدست‌تر
- فیلد اختیاری توضیحات در ساخت/ویرایش (mock از قبل پشتیبانی می‌کند)
- دسترسی‌پذیری بهتر جدول و دیالوگ‌ها
