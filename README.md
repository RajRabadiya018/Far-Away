# 🌴 Far Away - Personal Packing List App

A smart React packing list application to help you organize your travel essentials across multiple destinations. Manage your packing with intelligent suggestions and track your progress for each stop on your trip.

## ✨ Features

### Multi-Destination Support
- **Multiple Destinations**: Create separate packing lists for different stops in your trip (Paris, Swiss Alps, Beach resort, etc.)
- **Destination Types**: Choose from preset types (Beach, Mountain, City, Business, Camping, etc.) with custom emojis and colors
- **Smart Suggestions**: Get relevant packing suggestions based on destination type
  - Beach: Swimsuit, Sunscreen, Beach Towel
  - Mountain: Hiking Boots, Jacket, Gloves
  - City: Walking Shoes, Camera, Day Bag
  - And more!

### Packing Management
- **Add Items**: Quickly add items with quantity (1-20)
- **Smart Input**: Click suggestions to auto-fill the input field
- **Mark as Packed**: Check off items as you pack them
- **Delete Items**: Remove unwanted items
- **Clear List**: Bulk delete with confirmation

### Viewing & Organization
- **Three View Modes**:
  - Current Destination: See only items for selected destination
  - All Destinations: View all items with destination badges
  - Grouped by Destination: See items organized by destination
- **Sort Options**:
  - Input order
  - Alphabetically by description
  - Packed status

### Progress Tracking
- **Per-Destination Stats**: Track packing progress for each destination
- **Overall Progress**: See total packing completion across all destinations
- **Visual Progress**: Color-coded tabs and progress indicators

### Data Persistence
- **LocalStorage**: All data automatically saved and persisted across page refreshes
- **No Backend Required**: Everything runs locally in your browser

## 🚀 Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open `http://localhost:3000` in your browser

## 📖 How to Use

1. **Create Destinations**:
   - Click "+ Add" in the destination tabs
   - Enter destination name and select type
   - Switch between destinations by clicking tabs

2. **Add Items**:
   - Select quantity (1-20)
   - Type item name or click a suggestion
   - Click "Add" button

3. **Manage Items**:
   - Check checkbox to mark as packed
   - Click ❎ to delete an item
   - Use "Clear list" to remove all items

4. **Change Views**:
   - Use dropdown to switch between Current/All/Grouped views
   - Sort items by order, name, or packed status

5. **Track Progress**:
   - View stats at bottom showing completion percentage
   - See per-destination progress in "All" or "Grouped" views

## 🛠️ Technologies

- **React 19** with Hooks (useState, useEffect)
- **LocalStorage API** for data persistence
- **CSS3** for styling and animations
- **No backend** - Pure frontend application

## � Project Structure

```
far-away/
├── src/
│   ├── components/
│   │   ├── App.js                   # Main app with state management
│   │   ├── DestinationManager.js    # Destination tabs & management
│   │   ├── DestinationCard.js       # Individual destination cards
│   │   ├── Form.js                  # Add item form with suggestions
│   │   ├── PackingList.js           # Item list with view modes
│   │   ├── Item.js                  # Individual item component
│   │   ├── Stats.js                 # Progress statistics
│   │   └── Logo.js                  # App header
│   ├── index.css                    # Global styles
│   └── index.js                     # App entry point
└── package.json
```

## 🎨 Destination Types & Suggestions

| Type     | Emoji | Suggested Items                                          |
| -------- | ----- | -------------------------------------------------------- |
| Beach    | 🏖️    | Swimsuit, Sunscreen, Sunglasses, Beach Towel, Flip-flops |
| Mountain | ⛰️    | Hiking Boots, Jacket, Gloves, Water Bottle, Backpack     |
| City     | 🏙️    | Walking Shoes, Day Bag, Camera, City Map                 |
| Business | 💼    | Suit, Dress Shoes, Laptop, Business Cards                |
| Camping  | 🏕️    | Tent, Sleeping Bag, Flashlight, Camping Stove            |
| Cruise   | 🚢    | Formal Wear, Swimsuit, Seasickness Pills                 |
| Winter   | ❄️    | Winter Coat, Snow Boots, Gloves, Thermal Underwear       |
| Desert   | 🏜️    | Sun Hat, Light Clothing, Water Bottle                    |


**Happy Packing! 🧳✈️**