"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { useState } from "react";

interface CourseCardProps {
  id: string;
  title: string;
  provider: string;
  institution: string;
  image?: string;
  link: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
  isFree?: boolean;
}

// Provider default images - guaranteed to work
const providerDefaultImages = {
  "Coursera": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/media/coursera-logo-square.png",
  "edX": "https://prod-discovery.edx-cdn.org/organization/logos/2a73d2ce-c34a-4e08-8223-83bca9d2f01d-2cc8854c6fee.png",
  "Udemy": "https://img-c.udemycdn.com/course/480x270/637930_9a22_24.jpg",
  "Khan Academy": "https://cdn.kastatic.org/images/khan-logo-vertical-transparent.png",
  "Harvard University": "https://prod-discovery.edx-cdn.org/organization/logos/44022f13-20df-4666-9111-cede3e5dc5b6-2cc39992c67a.png",
  "Yale University": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/7e/aff5b0f54c11e7ad7ebd6b426fec6b/Logo_TheScienceofWell-Being.png",
  "MIT": "https://prod-discovery.edx-cdn.org/organization/logos/2a73d2ce-c34a-4e08-8223-83bca9d2f01d-2cc8854c6fee.png",
  "Stanford University": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/bf/4f7f70145611e7b4b739de9c4658e8/Logo_ML_Sized.png",
  "freeCodeCamp": "https://d33wubrfki0l68.cloudfront.net/0a3829f623c2517c0c11e8cf05721094eca78df4/85afd/img/fcc_secondary_small.svg",
  "Udacity": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Udacity_logo.svg/1200px-Udacity_logo.svg.png",
  "Codecademy": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Codecademy.svg/1200px-Codecademy.svg.png",
  "DataCamp": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Datacamp.svg",
  "default": "https://img-c.udemycdn.com/course/480x270/637930_9a22_24.jpg" // Guaranteed to work
};

// Category default images - guaranteed to work
const categoryDefaultImages = {
  "Computer Science": "https://img-c.udemycdn.com/course/480x270/2776760_f176_10.jpg",
  "Programming": "https://img-c.udemycdn.com/course/480x270/2776760_f176_10.jpg",
  "Web Development": "https://img-c.udemycdn.com/course/480x270/625204_436a_3.jpg",
  "Data Science": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/bf/4f7f70145611e7b4b739de9c4658e8/Logo_ML_Sized.png",
  "Machine Learning": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/bf/4f7f70145611e7b4b739de9c4658e8/Logo_ML_Sized.png",
  "Business": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/fc/3b5a43d6d5adc1f3d8eb77c52c105a/Logo-Coursera.png",
  "Marketing": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/fc/3b5a43d6d5adc1f3d8eb77c52c105a/Logo-Coursera.png",
  "Personal Development": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/c4/a57620502a11e8b22639a758e7e52f/Learning-How-to-Learn-thumbnail-13.jpg",
  "Psychology": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/7e/aff5b0f54c11e7ad7ebd6b426fec6b/Logo_TheScienceofWell-Being.png",
  "default": "https://img-c.udemycdn.com/course/480x270/637930_9a22_24.jpg"
};

// Function to get appropriate image based on provider
const getProviderImage = (provider: string, image?: string, category?: string): string => {
  // If image exists and is not a placeholder or problematic URL, use it
  if (image && 
      !image.includes("via.placeholder.com") && 
      !image.includes("placeholder") &&
      !image.includes("certificate") &&
      !image.endsWith(".share")) {
    return image;
  }
  
  // Check for institution/provider specific defaults
  if (providerDefaultImages[provider]) {
    return providerDefaultImages[provider];
  }
  
  // Try to match provider format variations
  const providerLower = provider.toLowerCase();
  if (providerLower.includes("harvard")) {
    return providerDefaultImages["Harvard University"];
  } else if (providerLower.includes("yale")) {
    return providerDefaultImages["Yale University"];
  } else if (providerLower.includes("mit")) {
    return providerDefaultImages["MIT"];
  } else if (providerLower.includes("stanford")) {
    return providerDefaultImages["Stanford University"];
  } else if (providerLower.includes("freecodecamp")) {
    return providerDefaultImages["freeCodeCamp"];
  } else if (providerLower.includes("codecademy")) {
    return providerDefaultImages["Codecademy"];
  } else if (providerLower.includes("udacity")) {
    return providerDefaultImages["Udacity"];
  } else if (providerLower.includes("datacamp")) {
    return providerDefaultImages["DataCamp"];
  }
  
  // Try category-based fallback
  if (category) {
    if (categoryDefaultImages[category]) {
      return categoryDefaultImages[category];
    }
    
    if (category.includes("Computer Science") || category.includes("Programming")) {
      return categoryDefaultImages["Programming"];
    } else if (category.includes("Data") || category.includes("Machine Learning")) {
      return categoryDefaultImages["Data Science"];
    } else if (category.includes("Business") || category.includes("Marketing")) {
      return categoryDefaultImages["Business"];
    } else if (category.includes("Web")) {
      return categoryDefaultImages["Web Development"];
    }
  }
  
  // Default image
  return providerDefaultImages.default;
};

export function CourseCard({
  id,
  title,
  provider,
  institution,
  image,
  link,
  rating = 0,
  reviewCount = 0,
  category,
  isFree = false,
}: CourseCardProps) {
  const [imgSrc, setImgSrc] = useState<string>(getProviderImage(provider, image, category));
  const [hasError, setHasError] = useState<boolean>(false);
  
  // Handle image error
  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      // If initial image fails, try provider fallback
      if (providerDefaultImages[provider]) {
        setImgSrc(providerDefaultImages[provider]);
      } else if (category && categoryDefaultImages[category]) {
        // Try category fallback
        setImgSrc(categoryDefaultImages[category]);
      } else {
        // Last resort default
        setImgSrc(providerDefaultImages.default);
      }
    }
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {link.startsWith("http") ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
          <Card className="overflow-hidden h-full flex flex-col hover:border-primary/50 transition-colors">
            <div className="relative overflow-hidden">
              <ResponsiveImage
                src={imgSrc}
                alt={title}
                aspectRatio="video"
                className="transition-transform hover:scale-105 duration-500"
                onError={handleImageError}
              />
              {isFree && (
                <Badge className="absolute top-2 left-2 bg-green-600 hover:bg-green-700">
                  Free
                </Badge>
              )}
              {category && (
                <Badge variant="secondary" className="absolute top-2 right-2">
                  {category}
                </Badge>
              )}
            </div>
            <CardContent className="flex-1 flex flex-col p-4">
              <div className="text-xs text-muted-foreground mb-1">
                {provider} • {institution}
              </div>
              <h3 className="font-semibold line-clamp-2 mb-auto">
                {title}
              </h3>
            </CardContent>
            {rating > 0 && (
              <CardFooter className="p-4 pt-0 flex gap-1 items-center text-amber-500">
                <Star className="fill-current h-4 w-4" />
                <span className="text-sm font-medium">{rating.toFixed(1)}</span>
                {reviewCount > 0 && (
                  <span className="text-xs text-muted-foreground">({reviewCount})</span>
                )}
              </CardFooter>
            )}
          </Card>
        </a>
      ) : (
        <Link href={link} className="block h-full">
          <Card className="overflow-hidden h-full flex flex-col hover:border-primary/50 transition-colors">
            <div className="relative overflow-hidden">
              <ResponsiveImage
                src={imgSrc}
                alt={title}
                aspectRatio="video"
                className="transition-transform hover:scale-105 duration-500"
                onError={handleImageError}
              />
              {isFree && (
                <Badge className="absolute top-2 left-2 bg-green-600 hover:bg-green-700">
                  Free
                </Badge>
              )}
              {category && (
                <Badge variant="secondary" className="absolute top-2 right-2">
                  {category}
                </Badge>
              )}
            </div>
            <CardContent className="flex-1 flex flex-col p-4">
              <div className="text-xs text-muted-foreground mb-1">
                {provider} • {institution}
              </div>
              <h3 className="font-semibold line-clamp-2 mb-auto">
                {title}
              </h3>
            </CardContent>
            {rating > 0 && (
              <CardFooter className="p-4 pt-0 flex gap-1 items-center text-amber-500">
                <Star className="fill-current h-4 w-4" />
                <span className="text-sm font-medium">{rating.toFixed(1)}</span>
                {reviewCount > 0 && (
                  <span className="text-xs text-muted-foreground">({reviewCount})</span>
                )}
              </CardFooter>
            )}
          </Card>
        </Link>
      )}
    </motion.div>
  );
}
