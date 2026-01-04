import { Article } from "../types";
import { fetchSimulatedNews } from "./ai";

// Helper to parse XML to JSON loosely
const parseRSS = (xmlText: string): any[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  const items = Array.from(xmlDoc.querySelectorAll("item"));
  
  return items.slice(0, 8).map(item => ({
    title: item.querySelector("title")?.textContent || "No Title",
    link: item.querySelector("link")?.textContent || "#",
    pubDate: item.querySelector("pubDate")?.textContent || new Date().toISOString(),
    source: item.querySelector("source")?.textContent || "Google News",
    description: item.querySelector("description")?.textContent || ""
  }));
};

export const fetchNewsArticles = async (topic: string): Promise<Article[]> => {
  // Google News RSS URL
  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=en-US&gl=US&ceid=US:en`;
  
  // Try to use a common CORS proxy. 
  // Note: In a production environment, this should be routed through a Next.js API Route /api/articles?topic=...
  // Since we are in a purely client-side environment for this demo, we try a proxy or fallback to AI simulation.
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error("Network response was not ok");
    
    const text = await response.text();
    const rssItems = parseRSS(text);
    
    if (rssItems.length === 0) {
      throw new Error("No items found in RSS feed");
    }

    return rssItems.map((item) => {
        // Clean up description HTML often returned by Google News
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = item.description;
        const cleanSnippet = tempDiv.textContent || item.title;

        return {
            id: crypto.randomUUID(),
            title: item.title,
            source: item.source,
            url: item.link,
            publishedAt: item.pubDate,
            snippet: cleanSnippet.substring(0, 150) + (cleanSnippet.length > 150 ? "..." : ""),
        };
    });

  } catch (error) {
    console.warn("RSS Fetch failed or blocked by CORS. Switching to AI Simulation mode.", error);
    // Fallback to AI generation for the demo to ensure functionality
    return await fetchSimulatedNews(topic);
  }
};