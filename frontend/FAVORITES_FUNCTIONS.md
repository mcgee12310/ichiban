# Detail Page - Functions Summary

## 1. **ADD TO FAVORITES FUNCTION**
```javascript
// Location: Detail.jsx, line 80-88
const handleToggleFavorite = async () => {
  try {
    setIsUpdatingFavorite(true);
    if (isFavorited) {
      await removeFromFavorite(eventId);  // Remove if already favorited
      setIsFavorited(false);
    } else {
      await addToFavorite(eventId);       // Add if not favorited
      setIsFavorited(true);
    }
  } catch (err) {
    console.error('Error toggling favorite:', err);
    alert('Error updating favorite status');
  } finally {
    setIsUpdatingFavorite(false);
  }
};
```

**Called by:** Heart button click (line 224)

---

## 2. **REMOVE FROM FAVORITES FUNCTION**
Uses the same `handleToggleFavorite()` function above:
- Calls `removeFromFavorite(eventId)` from FavoriteService.js
- Sets `isFavorited` to `false`
- Heart icon becomes unfilled

---

## 3. **CHECK IF FAVORITED ON PAGE LOAD**
```javascript
// Location: Detail.jsx, line 20-27
useEffect(() => {
  const loadEventDetail = async () => {
    try {
      const data = await fetchEventDetail(eventId);
      setEventData(data);
      
      // Check if already favorited
      const favorited = await checkIfFavorited(eventId);
      setIsFavorited(favorited);  // ← This loads favorite status
    } catch (err) {
      // Handle error
    }
  };
  
  if (eventId) {
    loadEventDetail();
  }
}, [eventId]);
```

---

## 4. **CATEGORIES DISPLAY**
```javascript
// Location: Detail.jsx, line 233-242
<div className="flex flex-wrap gap-2 mb-4">
  {place.categories.map((category, index) => (
    <span
      key={index}
      className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-full text-sm font-medium"
    >
      <Tag size={14} />
      {category}
    </span>
  ))}
</div>
```

Shows event categories like "Kids", "Family-friendly", "Free", etc.

---

## 5. **HEART BUTTON UI**
```javascript
// Location: Detail.jsx, line 223-230
<button 
  onClick={handleToggleFavorite}                    // Click to add/remove
  disabled={isUpdatingFavorite}                     // Disabled while updating
  className={`${isFavorited ? 'bg-red-100 text-red-500' : 'bg-red-50 hover:bg-red-100'} ...`}
  title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
>
  <Heart size={24} fill={isFavorited ? 'currentColor' : 'none'} />
</button>
```

**States:**
- ❌ Not favorited: Empty heart, light background
- ✅ Favorited: Filled red heart, red background

---

## **FLOW:**

1. **User views event detail** → `checkIfFavorited()` checks status
2. **User clicks heart** → `handleToggleFavorite()` triggers
3. **If not favorited** → `addToFavorite()` sends POST to backend
4. **If favorited** → `removeFromFavorite()` sends DELETE to backend
5. **Heart updates** → UI reflects the new state

**Backend Endpoints:**
- Add: `POST http://localhost:8080/api/users/1/favorites/{eventId}`
- Remove: `DELETE http://localhost:8080/api/users/1/favorites/{eventId}`
- Check: `GET http://localhost:8080/api/users/1/favorites/{eventId}/check`
