"use client";

import { useRouter } from "next/navigation";
import { useHavanaStore } from "./state/havana-store";
import { HomeScreen } from "./screens/HomeScreen";
import { ProductDetailsScreen } from "./screens/ProductDetailsScreen";
import { CartScreen } from "./screens/CartScreen";
import { CheckoutScreen } from "./screens/CheckoutScreen";
import { MapPickerScreen } from "./screens/MapPickerScreen";
import { OrderConfirmationScreen } from "./screens/OrderConfirmationScreen";
import { OrdersScreen } from "./screens/OrdersScreen";
import { OrderDetailsScreen } from "./screens/OrderDetailsScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

export function HavanaApp() {
  const router = useRouter();
  const currentScreen = useHavanaStore((s) => s.currentScreen);
  const navigate = useHavanaStore((s) => s.navigate);
  const signOut = useHavanaStore((s) => s.signOut);
  const setSelectedProductId = useHavanaStore((s) => s.setSelectedProductId);
  const selectedProductId = useHavanaStore((s) => s.selectedProductId);
  const selectedOrderId = useHavanaStore((s) => s.selectedOrderId);
  const setSelectedOrderId = useHavanaStore((s) => s.setSelectedOrderId);
  const lastPlacedOrder = useHavanaStore((s) => s.lastPlacedOrder);
  const setSelectedAddress = useHavanaStore((s) => s.setSelectedAddress);
  const selectedAddress = useHavanaStore((s) => s.selectedAddress);
  const updateOrderStatus = useHavanaStore((s) => s.updateOrderStatus);

  const handleLogout = () => {
    signOut();
    router.replace("/");
  };

  switch (currentScreen) {
    case "home":
      return (
        <HomeScreen
          onProductClick={(id) => {
            setSelectedProductId(id);
            navigate("productDetails");
          }}
          onCartClick={() => navigate("cart")}
          onOrdersClick={() => navigate("orders")}
          onProfileClick={() => navigate("profile")}
        />
      );
    case "productDetails":
      return (
        <ProductDetailsScreen
          productId={selectedProductId ?? ""}
          onBackClick={() => navigate("home")}
          onCartClick={() => navigate("cart")}
          onCheckoutClick={() => navigate("checkout")}
        />
      );
    case "cart":
      return (
        <CartScreen
          onBackClick={() => navigate("home")}
          onCheckoutClick={() => navigate("checkout")}
          onHomeClick={() => navigate("home")}
          onOrdersClick={() => navigate("orders")}
          onProfileClick={() => navigate("profile")}
        />
      );
    case "checkout":
      return (
        <CheckoutScreen
          onBackClick={() => navigate("cart")}
          onPickOnMap={() => navigate("mapPicker")}
          savedAddress={selectedAddress}
        />
      );
    case "mapPicker":
      return (
        <MapPickerScreen
          onAddressConfirmed={(address) => {
            setSelectedAddress(address);
            navigate("checkout");
          }}
          onBackClick={() => navigate("checkout")}
        />
      );
    case "orderConfirmation":
      return (
        <OrderConfirmationScreen
          order={lastPlacedOrder}
          onViewOrders={() => navigate("orders")}
          onContinueShopping={() => navigate("home")}
        />
      );
    case "orders":
      return (
        <OrdersScreen
          onOrderClick={(orderId) => {
            setSelectedOrderId(orderId);
            navigate("orderDetails");
          }}
          onHomeClick={() => navigate("home")}
          onCartClick={() => navigate("cart")}
          onProfileClick={() => navigate("profile")}
        />
      );
    case "orderDetails":
      return (
        <OrderDetailsScreen
          orderId={selectedOrderId}
          onBackClick={() => navigate("orders")}
          onConfirmDelivery={(orderId) => updateOrderStatus(orderId, "delivered")}
        />
      );
    case "profile":
      return (
        <ProfileScreen
          onBackClick={() => navigate("home")}
          onHomeClick={() => navigate("home")}
          onCartClick={() => navigate("cart")}
          onOrdersClick={() => navigate("orders")}
          onLogoutClick={handleLogout}
        />
      );
    default:
      return (
        <HomeScreen
          onProductClick={(id) => {
            setSelectedProductId(id);
            navigate("productDetails");
          }}
          onCartClick={() => navigate("cart")}
          onOrdersClick={() => navigate("orders")}
          onProfileClick={() => navigate("profile")}
        />
      );
  }
}
