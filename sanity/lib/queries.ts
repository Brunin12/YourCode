import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || categories match $search || author->name match $search] | order(_createdAt desc) {
  _id, 
  title,
  _createdAt,
  author -> {
    _id, name, image, bio
  },
  views,
  title,
  slug,
  category, 
  description,
  image,
}`)