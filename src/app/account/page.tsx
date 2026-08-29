import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account | Coastal Aesthetic",
  description: "Manage your Coastal Aesthetic account, orders and wishlist.",
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 md:px-6 py-12">
      <h1 className="font-display text-3xl">My Account</h1>
      <p className="mt-2 text-sm text-stone-600">Welcome back — manage orders, wishlist, and preferences.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-sand-200 bg-white p-4 h-fit">
          <nav className="space-y-1">
            {["Overview", "Orders", "Addresses", "Wishlist", "Settings"].map((item, i) => (
              <a key={item} href="#" className={`block rounded-xl px-4 py-3 text-sm font-medium ${i === 0 ? "bg-ocean text-white" : "hover:bg-sand-50"}`}>
                {item}
              </a>
            ))}
          </nav>
          <div className="mt-6 rounded-xl bg-sand-50 p-4">
            <p className="text-sm font-medium">Need help?</p>
            <p className="mt-1 text-xs text-stone-500">Contact concierge — we reply within 24h.</p>
            <a href="#" className="mt-3 inline-block text-xs font-semibold text-ocean underline">Contact us →</a>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="rounded-2xl border border-sand-200 bg-white p-6">
            <h2 className="font-display text-xl">Login</h2>
            <p className="mt-1 text-sm text-stone-500">Placeholder — connect to Shopify Customer Account API or your auth provider.</p>
            <form className="mt-6 space-y-4" action="#">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input type="email" placeholder="you@example.com" className="mt-1 w-full rounded-full border border-sand-200 px-4 py-3 text-sm outline-none focus:border-ocean" />
              </div>
              <div>
                <label className="text-sm font-medium">Password</label>
                <input type="password" placeholder="••••••••" className="mt-1 w-full rounded-full border border-sand-200 px-4 py-3 text-sm outline-none focus:border-ocean" />
              </div>
              <button type="submit" className="w-full rounded-full bg-ocean py-3 text-sm font-semibold text-white hover:bg-[#0f2e2c]">Sign In</button>
              <p className="text-center text-xs text-stone-500">
                <a href="#" className="underline">Forgot password?</a> • <a href="#" className="underline">Create account</a>
              </p>
            </form>
          </div>

          <div className="rounded-2xl border border-dashed border-sand-200 bg-sand-50 p-6">
            <h3 className="font-medium">Orders</h3>
            <p className="mt-1 text-sm text-stone-500">No orders yet — your beach essentials will appear here after checkout.</p>
            <a href="/collections/shop-all" className="mt-3 inline-flex rounded-full bg-white border border-sand-200 px-5 py-2 text-sm font-medium hover:border-ocean">Start shopping</a>
          </div>
        </div>
      </div>
    </div>
  );
}
