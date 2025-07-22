# Sanskrit Restaurant - Enhanced Breakfast Menu with Allergen Filtering

## Overview
The breakfast menu has been enhanced with comprehensive allergen information and advanced filtering capabilities based on the uploaded breakfast-menu.pdf requirements.

## New Features

### 1. Enhanced Allergen Data
All breakfast menu items now include detailed allergen information:
- **Gluten**: Items containing wheat, semolina, or other gluten sources
- **Dairy**: Items containing milk, ghee, paneer, cheese, yogurt
- **Nuts**: Items containing peanuts or tree nuts
- **Eggs**: Items containing eggs
- **Soy**: Items that may contain soy products

### 2. Advanced Filtering System
The menu now features multiple filtering options:

#### Diet Filters:
- **All Items**: Shows everything
- **Vegetarian**: Items containing dairy but no meat/fish
- **Vegan**: Plant-based items only

#### Allergen-Free Filters (Checkboxes):
- **Gluten Free**: ✅ Hide items containing gluten
- **Dairy Free**: ✅ Hide items containing dairy
- **Nut Free**: ✅ Hide items containing nuts
- **Egg Free**: ✅ Hide items containing eggs
- **Soy Free**: ✅ Hide items containing soy

#### Spice Level Filters:
- **All Levels**: No spice filtering
- **Mild**: Spice level 0-1
- **Medium**: Spice level 2 🌶️
- **Hot**: Spice level 3 🌶️🌶️

### 3. Visual Allergen Tags
Each menu item displays clear allergen information:
- **Green tags**: Allergen-free options (e.g., "Gluten Free")
- **Yellow tags**: Contains allergens (e.g., "Contains Dairy")
- **Spice indicators**: Clear spice level indicators

### 4. Real-time Filtering
- Filters work instantly without page refresh
- Multiple filters can be combined
- Live counter shows number of matching items
- Smooth animations for showing/hiding items

## Menu Categories Enhanced

### DOSA (Rice-Lentil Crepes)
- Most dosas are naturally gluten-free and vegan
- Rava Dosa contains gluten (semolina)
- Ghee-based items contain dairy
- Cheese/paneer variants contain dairy

### IDLI (Steamed Rice Cakes)
- Base idlis are gluten-free and vegan
- Ghee preparations contain dairy
- All naturally nut-free

### VADA (Lentil Doughnuts)
- Naturally gluten-free and vegan
- Dahi Vada contains dairy (yogurt)

### RICE DISHES
- Most are gluten-free
- Lemon Rice contains nuts (peanuts)
- Yogurt Rice contains dairy
- Egg Fried Rice contains eggs

### HOUSE SPECIALS
- Added traditional items: Appam, Poha, Chole Bhature
- Includes egg dishes for non-vegetarian options
- Comprehensive thali with multiple allergens
- Clear allergen labeling for complex dishes

## Usage Instructions

1. **Navigate to Breakfast Tab**: Click "Breakfast" in the menu tabs
2. **Select Diet Type**: Choose from All Items, Vegetarian, or Vegan
3. **Choose Allergen-Free Options**: Check boxes for allergens to avoid
4. **Set Spice Level**: Select preferred spice level or keep "All Levels"
5. **View Results**: See filtered items with live count

## Technical Implementation

### Data Structure
```html
<div class="menu-item" 
     data-allergens="dairy nuts" 
     data-spice-level="2" 
     data-categories="vegetarian">
```

### Filter Logic
- **Inclusion filters**: Diet types (show matching items)
- **Exclusion filters**: Allergens (hide items containing selected allergens)
- **Level filters**: Spice levels (show items at or below selected level)

### Responsive Design
- Mobile-friendly checkbox interface
- Touch-optimized filter buttons
- Collapsible filter sections on small screens

## Menu Highlights

### Gluten-Free Options
- Plain Dosa, Masala Dosa, Idli, Vada
- Most rice dishes
- Appam, traditional rice pancakes

### Vegan Options
- Traditional dosas (except ghee/cheese varieties)
- Plain idli and vada
- Most rice dishes (except yogurt rice)
- Many house specials

### Nut-Free Options
- Most dishes except Lemon Rice
- Clear labeling for peanut-containing items

### Low-Spice Options
- Mild dosas and idlis
- Yogurt rice for cooling effect
- Sweet dessert options

This enhanced system provides customers with clear, accurate allergen information while maintaining the authentic South Indian breakfast experience that Sanskrit Restaurant is known for.
