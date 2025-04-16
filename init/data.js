const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "Beach"
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "Iconic City"
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: "Mountain"
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: "Trending"
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Portland",
    country: "United States",
    category: "Forest"
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: "Beach"
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    category: "Lake"
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    category: "Top City"
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: "Arctic"
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    category: "Trending"
  },
  {
    title: "Historic Canal House",
    description:
      "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Camping"
  },
  {
    title: "Private Island Retreat",
    description:
      "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    category: "Trending"
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description:
      "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
  },
  {
    title: "Historic Brownstone in Boston",
    description:
      "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Boston",
    country: "United States",
  },
  {
    title: "Beachfront Bungalow in Bali",
    description:
      "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
  },
  {
    title: "Mountain View Cabin in Banff",
    description:
      "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Banff",
    country: "Canada",
  },
  {
    title: "Art Deco Apartment in Miami",
    description:
      "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Miami",
    country: "United States",
  },
  {
    title: "Tropical Villa in Phuket",
    description:
      "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
  },
  {
    title: "Historic Castle in Scotland",
    description:
      "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
  },
  {
    title: "Desert Oasis in Dubai",
    description:
      "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
  },
  {
    title: "Rustic Log Cabin in Montana",
    description:
      "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Montana",
    country: "United States",
  },
  {
    title: "Beachfront Villa in Greece",
    description:
      "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Mykonos",
    country: "Greece",
  },
  {
    title: "Eco-Friendly Treehouse Retreat",
    description:
      "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
  },
  {
    title: "Historic Cottage in Charleston",
    description:
      "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Charleston",
    country: "United States",
  },
  {
    title: "Modern Apartment in Tokyo",
    description:
      "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
  },
  {
    title: "Lakefront Cabin in New Hampshire",
    description:
      "Spend your days by the lake in this cozy cabin in the scenic White Mountains of New Hampshire.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New Hampshire",
    country: "United States",
  },
  {
    title: "Luxury Villa in the Maldives",
    description:
      "Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
  },
  {
    title: "Ski Chalet in Aspen",
    description:
      "Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Secluded Beach House in Costa Rica",
    description:
      "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
  },
  {title: "Luxury Riad in Marrakech",
    description:
      "Immerse yourself in Moroccan culture at this elegant riad with a tranquil courtyard and rooftop views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1900,
    location: "Marrakech",
    country: "Morocco",
  },
  {
    title: "Nordic Cabin in Lapland",
    description:
      "Watch the Northern Lights dance across the sky from this cozy glass-roofed cabin in Lapland.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Lapland",
    country: "Finland",
  },
  {
    title: "Oceanfront Villa in Santorini",
    description:
      "Experience the magic of Santorini in this stunning villa with panoramic views of the Aegean Sea and famous sunsets.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1469796466635-455ede028aca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Santorini",
    country: "Greece",
  },
  {
    title: "Luxury Penthouse in Singapore",
    description:
      "Stay in this ultra-modern penthouse with breathtaking views of Singapore's skyline and Marina Bay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "Singapore",
    country: "Singapore",
  },
  {
    title: "Charming Vineyard Cottage",
    description:
      "Relax among the vines in this charming cottage located in the heart of Napa Valley's wine country.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1543922596-b3bbaba80649?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGElMjB2aW5leWFyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Napa Valley",
    country: "United States",
  },
  {
    title: "Tropical Bungalow in Bora Bora",
    description:
      "Experience paradise in this overwater bungalow with direct access to the crystal-clear lagoon of Bora Bora.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 5500,
    location: "Bora Bora",
    country: "French Polynesia",
  },
  {
    title: "Historic Townhouse in Prague",
    description:
      "Step back in time in this beautifully preserved townhouse in the heart of Prague's Old Town.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1700,
    location: "Prague",
    country: "Czech Republic",
  },
  {
    title: "Beachfront Condo in Hawaii",
    description:
      "Wake up to the sound of waves in this luxurious beachfront condo on the beautiful island of Maui.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Maui",
    country: "United States",
  },
  {
    title: "Mountain Lodge in the Swiss Alps",
    description:
      "Enjoy breathtaking mountain views from this traditional Swiss lodge nestled in the picturesque Alps.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520637102912-2df6bb2aec6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Zermatt",
    country: "Switzerland",
  },
  {
    title: "Luxury Safari Tent in Kenya",
    description:
      "Experience the African wilderness in comfort with this luxury safari tent overlooking the Maasai Mara.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "Maasai Mara",
    country: "Kenya",
  },
  {
    title: "Riverside Cabin in Montana",
    description:
      "Listen to the soothing sounds of the river from this cozy cabin nestled in the Montana wilderness.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1300,
    location: "Montana",
    country: "United States",
  },
  {
    title: "Stylish Loft in Berlin",
    description:
      "Stay in this trendy loft apartment in Berlin's hip Kreuzberg district, close to cafes, bars, and galleries.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1400,
    location: "Berlin",
    country: "Germany",
  },
  {
    title: "Cliffside Villa in Amalfi",
    description:
      "Perched on the cliffs of the Amalfi Coast, this villa offers stunning views of the Mediterranean Sea.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFtYWxmaSUyMGNvYXN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3800,
    location: "Amalfi",
    country: "Italy",
  },
  {
    title: "Traditional Ryokan in Kyoto",
    description:
      "Experience authentic Japanese culture in this traditional ryokan with tatami floors and a peaceful garden.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1900,
    location: "Kyoto",
    country: "Japan",
  },
  {
    title: "Desert Retreat in Sedona",
    description:
      "Reconnect with nature in this peaceful retreat surrounded by the red rocks and spiritual energy of Sedona.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1527427337751-fdca2f128ce5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1700,
    location: "Sedona",
    country: "United States",
  },
  {
    title: "Beachfront Villa in the Seychelles",
    description:
      "Indulge in luxury at this exclusive beachfront villa with private pool on a pristine Seychelles beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 5000,
    location: "Mahé",
    country: "Seychelles",
  },
  {
    title: "Historic Apartment in Paris",
    description:
      "Stay in this elegant Parisian apartment with high ceilings and balcony views of the Eiffel Tower.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Paris",
    country: "France",
  },
  {
    title: "Rainforest Treehouse in Costa Rica",
    description:
      "Sleep among the treetops in this unique treehouse surrounded by the sounds and sights of the rainforest.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Monteverde",
    country: "Costa Rica",
  },
  {
    title: "Luxury Yacht in Monaco",
    description:
      "Experience the ultimate luxury with a stay on this private yacht docked in the glamorous Monaco harbor.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 8000,
    location: "Monaco",
    country: "Monaco",
  },
  {
    title: "Rustic Farmhouse in Tuscany",
    description:
      "Experience the authentic charm of Tuscany in this beautifully restored farmhouse surrounded by olive groves.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Tuscany",
    country: "Italy",
  },
  {
    title: "Overwater Bungalow in Tahiti",
    description:
      "Wake up to panoramic views of turquoise waters in this luxurious overwater bungalow in Tahiti.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "Tahiti",
    country: "French Polynesia",
  },
  {
    title: "Cozy Cottage in the English Countryside",
    description:
      "Escape to this charming stone cottage with a thatched roof in the picturesque Cotswolds countryside.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
  },
  {
    title: "Modern Villa in Cape Town",
    description:
      "Enjoy breathtaking views of Table Mountain from this contemporary villa with infinity pool in Cape Town.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwdmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Cape Town",
    country: "South Africa",
  },
  {
    title: "Lakeside Cabin in Sweden",
    description:
      "Disconnect from the world in this peaceful cabin on the shores of a pristine Swedish lake.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506974210756-8e1b8985d348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1400,
    location: "Stockholm Archipelago",
    country: "Sweden",
  },
  {
    title: "Historic Riad in Fes",
    description:
      "Step into history in this beautifully restored traditional riad in the ancient medina of Fes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Fes",
    country: "Morocco",
  },
  {
    title: "Beachfront Cottage in the Hamptons",
    description:
      "Relax in this elegant beach cottage with direct access to a private beach in the prestigious Hamptons.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "The Hamptons",
    country: "United States",
  },
  {
    title: "Mountain Chalet in Chamonix",
    description:
      "Hit the slopes from this traditional wooden chalet with stunning views of Mont Blanc in Chamonix.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Chamonix",
    country: "France",
  },
  {
    title: "Luxury Tent in the Sahara",
    description:
      "Experience the magic of the desert in this luxury tent camp in the Sahara with traditional Berber hospitality.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1542293787938-c9e299b880cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1900,
    location: "Merzouga",
    country: "Morocco",
  },
  {
    title: "Waterfront Apartment in Venice",
    description:
      "Stay in this charming apartment with a balcony overlooking the picturesque canals of Venice.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2100,
    location: "Venice",
    country: "Italy",
  },
  {
    title: "Tropical Villa in Koh Samui",
    description:
      "Relax in this luxurious villa with private infinity pool overlooking the Gulf of Thailand in Koh Samui.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505881502353-a1986add3762?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2700,
    location: "Koh Samui",
    country: "Thailand",
  },
  {
    title: "Historic Castle in Ireland",
    description:
      "Live like royalty in this authentic medieval castle set amidst the lush green countryside of Ireland.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "County Clare",
    country: "Ireland",
  },
  {
    title: "Beachfront Bungalow in Tulum",
    description:
      "Wake up to the sound of waves in this eco-friendly beachfront bungalow on the pristine shores of Tulum.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Tulum",
    country: "Mexico",
  },
  {
    title: "Alpine Retreat in New Zealand",
    description:
      "Enjoy breathtaking views of the Southern Alps from this modern retreat near Queenstown.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2400,
    location: "Queenstown",
    country: "New Zealand",
  },
  {
    title: "Luxury Apartment in Barcelona",
    description:
      "Stay in this stylish apartment in the heart of Barcelona, just steps away from Gaudí's masterpieces.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1900,
    location: "Barcelona",
    country: "Spain",
  },
  {
    title: "Secluded Beach House in Australia",
    description:
      "Escape to this modern beach house with panoramic ocean views on Australia's stunning Great Ocean Road.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2300,
    location: "Great Ocean Road",
    country: "Australia",
  },
  {
    title: "Traditional Houseboat in Kashmir",
    description:
      "Experience the unique charm of staying on a traditional wooden houseboat on the serene Dal Lake.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1623718649591-311775a30c43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2Vib2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Srinagar",
    country: "India",
  },
  {
    title: "Luxury Penthouse in Rio de Janeiro",
    description:
      "Enjoy breathtaking views of Copacabana Beach from this luxurious penthouse in Rio de Janeiro.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Rio de Janeiro",
    country: "Brazil",
  },
  {
    title: "Historic Lighthouse in Maine",
    description:
      "Stay in this unique converted lighthouse with panoramic ocean views on the rugged coast of Maine.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlnaHRob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Maine",
    country: "United States",
  },
  {
    title: "Bamboo House in Bali",
    description:
      "Experience sustainable luxury in this unique bamboo house nestled in the lush jungle of Bali.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1560184611-ff3e53f00e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1700,
    location: "Ubud",
    country: "Indonesia",
  },
  {
    title: "Vineyard Estate in Argentina",
    description:
      "Stay at this elegant estate in the heart of Argentina's wine country with your own private vineyard views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1541704328070-20bf4601ae3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Mendoza",
    country: "Argentina",
  },
  {
    title: "Coastal Cottage in Cornwall",
    description:
      "Relax in this charming stone cottage with sea views in the picturesque fishing village of Cornwall.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1400,
    location: "Cornwall",
    country: "United Kingdom",
  },
  {
    title: "Desert Villa in Palm Springs",
    description:
      "Enjoy the desert lifestyle in this mid-century modern villa with private pool in sunny Palm Springs.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1540321975033-2fff3a5a3945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2100,
    location: "Palm Springs",
    country: "United States",
  },
  {
    title: "Lakeside Cabin in Canada",
    description:
      "Escape to this cozy cabin on the shores of Lake Louise with stunning views of the Canadian Rockies.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1593053272490-e0ed6d6a42c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Banff National Park",
    country: "Canada",
  },
  {
    title: "Tropical Villa in Sri Lanka",
    description:
      "Relax in this beautiful villa surrounded by lush tropical gardens just steps from the beaches of Sri Lanka.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Unawatuna",
    country: "Sri Lanka",
  },
  {
    title: "Mountain Lodge in Patagonia",
    description:
      "Experience the rugged beauty of Patagonia from this comfortable lodge with views of the Andes mountains.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Torres del Paine",
    country: "Chile",
  },
  {
    title: "Historic Apartment in Vienna",
    description:
      "Stay in this elegant apartment in a historic building in the heart of Vienna's cultural district.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Vienna",
    country: "Austria",
  },
  {
    title: "Beachfront Villa in the Bahamas",
    description:
      "Enjoy paradise in this luxurious villa with private beach access on a pristine Bahamian island.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "Exuma",
    country: "Bahamas",
  },
  {
    title: "Traditional Chalet in the Dolomites",
    description:
      "Experience the charm of the Italian Alps in this traditional wooden chalet with stunning mountain views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2400,
    location: "South Tyrol",
    country: "Italy",
  },
  {
    title: "Luxury Tent in Rajasthan",
    description:
      "Experience royal luxury in this opulent desert tent camp inspired by the Maharajas of Rajasthan.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Jaisalmer",
    country: "India",
  },
];

module.exports = { data: sampleListings };