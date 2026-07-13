export const WHATSAPP_NUMBER = "201278259732"; // 01278259732 in international format, no +

export function buildWhatsAppOrderLink(params: {
  productName: string;
  price: number;
  url: string;
}) {
  const { productName, price, url } = params;
  const message = [
    "Hello, I want to order this product.",
    "",
    `Product: ${productName}`,
    `Price: ${price} EGP`,
    `Product Link: ${url}`,
    "",
    "Thank you.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppGeneralLink(message = "Hello, I have a question about a product.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
