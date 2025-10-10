'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Star, Film, Users } from 'lucide-react'
// Note: showing only static lists (no API fetch) per request

export default function Footer() {
  // Fallbacks to ensure footer is never empty
  const userStaticTags = [
    { name: 'Anal', slug: 'anal' },
    { name: 'Babe', slug: 'babe' },
    { name: 'BBC', slug: 'bbc' },
    { name: 'Blowjob', slug: 'blowjob' },
    { name: 'Doggystyle', slug: 'doggystyle' },
    { name: 'Cumshot Family', slug: 'cumshotfamily' },
    { name: 'MILF', slug: 'milf' },
    { name: 'Mom', slug: 'mom' },
    { name: 'Office', slug: 'office' },
    { name: 'School', slug: 'school' },
  ]
  const fallbackTags = [
    { name: 'Indian', slug: 'indian' },
    { name: 'Hijabi', slug: 'hijabi' },
    ...userStaticTags,
  ]

  const userStaticStars = [
    { name: 'Valentina Nappi', slug: 'valentina-nappi' },
    { name: 'Leah Gotti', slug: 'leah-gotti' },
    { name: 'Mia Malkova', slug: 'mia-malkova' },
    { name: 'Lulu Chu', slug: 'lulu-chu' },
    { name: 'Dani Daniels', slug: 'dani-daniels' },
    { name: 'Lana Rhoades', slug: 'lana-rhoades' },
    { name: 'Abella Danger', slug: 'abella-danger' },
    { name: 'Aubree Valentine', slug: 'aubree-valentine' },
    { name: 'Mia Khalifa', slug: 'mia-khalifa' },
  ]
  const fallbackStars = [
    ...userStaticStars,
    { name: 'Sunny Leone', slug: 'sunny-leone' },
    { name: 'Riley Reid', slug: 'riley-reid' },
    { name: 'Angela White', slug: 'angela-white' },
    { name: 'Ava Addams', slug: 'ava-addams' },
    { name: 'Johnny Sins', slug: 'johnny-sins' },
    { name: 'Gianna Michaels', slug: 'gianna-michaels' },
    { name: 'Nicole Aniston', slug: 'nicole-aniston' },
  ]

  // Use only static lists so content never changes after refresh
  const footerTags = userStaticTags
  const footerPornstars = userStaticStars
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'New Videos', href: '/new-content' },
    { name: 'Popular Videos', href: '/most-liked' },
    { name: 'Pornstars', href: '/pornstars' },
    { name: 'Categories', href: '/tags' },
  ]

  // Categories aligned with spitxxx/src/components/partials/Slider.js
  const sliderCategories = [
    'chochox',
    'scout69',
    'comxxx',
    'lesbify',
    'milfnut',
    'badwap',
    'sex sister',
    'sex18',
    'desi49',
    'dehati sex',
    'boobs pressing',
    'blueflim',
    'aunt sex',
    'famili sex com',
    'teen sex',
    'small tits',
    'fullporner',
  ]
  const categories = sliderCategories.map((name) => ({
    name,
    href: `/category/${name.toLowerCase().replace(/\s+/g, '-')}`,
  }))

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold text-gradient">spitxxx</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Premium adult entertainment platform featuring high-quality videos from top performers worldwide.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm text-gray-400">
                <Film size={16} />
                <span>HD Quality</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-400">
                <Heart size={16} />
                <span>Daily Updates</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Film size={18} />
              <span>Quick Links</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs bg-gray-800 hover:bg-purple-600 px-2 py-1 rounded transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Users size={18} />
              <span>Categories</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 12).map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-xs bg-gray-800 hover:bg-purple-600 px-2 py-1 rounded transition-colors duration-200"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Tags */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Star size={18} />
              <span>Popular Tags</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {footerTags.slice(0, 8).map((tag, index) => (
                <Link
                  key={index}
                  href={`/tag/${tag.slug || tag.name?.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-xs bg-gray-800 hover:bg-purple-600 px-2 py-1 rounded transition-colors duration-200"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Pornstars */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Star size={18} />
            <span>Popular Pornstars</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {footerPornstars.slice(0, 12).map((star, index) => (
              <Link
                key={index}
                href={`/pornstar/${star.slug || star.name?.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs bg-gray-800 hover:bg-pink-600 px-2 py-1 rounded transition-colors duration-200"
              >
                {star.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              Â© {new Date().getFullYear()} spitxxx. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-purple-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-purple-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-purple-400 transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
