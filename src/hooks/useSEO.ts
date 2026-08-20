import { useEffect } from "react";
import {
  DEFAULT_SEO,
  SITE_NAME,
} from "../constants/seo";

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
}

function setMeta(
  name: string,
  content: string,
  property = false
): void {
  const selector = property
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;

  let tag =
    document.querySelector<HTMLMetaElement>(
      selector
    );

  if (!tag) {
    tag = document.createElement("meta");

    if (property) {
      tag.setAttribute(
        "property",
        name
      );
    } else {
      tag.setAttribute(
        "name",
        name
      );
    }

    document.head.appendChild(tag);
  }

  tag.setAttribute(
    "content",
    content
  );
}

export default function useSEO({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  keywords = DEFAULT_SEO.keywords,
  image = DEFAULT_SEO.image,
  type = DEFAULT_SEO.type,
}: SEOProps): void {
  useEffect(() => {
    document.title =
      `${title} | ${SITE_NAME}`;

    setMeta(
      "description",
      description
    );

    setMeta(
      "keywords",
      keywords
    );

    setMeta(
      "og:title",
      title,
      true
    );

    setMeta(
      "og:description",
      description,
      true
    );

    setMeta(
      "og:image",
      image,
      true
    );

    setMeta(
      "og:type",
      type,
      true
    );

    setMeta(
      "og:url",
      window.location.href,
      true
    );

    setMeta(
      "twitter:card",
      "summary_large_image"
    );

    setMeta(
      "twitter:title",
      title
    );

    setMeta(
      "twitter:description",
      description
    );

    setMeta(
      "twitter:image",
      image
    );
  }, [
    title,
    description,
    keywords,
    image,
    type,
  ]);
}