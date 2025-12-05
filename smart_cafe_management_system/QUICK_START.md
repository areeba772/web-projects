# 🚀 Quick Start Guide - Smart Cafe Management System

## ⚡ Fastest Way to Start (Windows)

### Method 1: Double-Click Batch Files (Easiest!)

1. **Start Backend:**
   - Double-click `start-backend.bat`
   - Wait for "Server running on: http://127.0.0.1:5000"

2. **Start Frontend:**
   - Double-click `start-frontend.bat`
   - Opens on http://localhost:8000

3. **OR Start Both Together:**
   - Double-click `start-all.bat`
   - Both servers start automatically!

### Method 2: Direct Browser (No Server Needed)

1. Navigate to: `frontend/src/index.html`
2. Right-click → Open with → Your Browser
3. **Note:** Some features may not work without backend

---

## 📋 Manual Start (If Batch Files Don't Work)

### Start Backend:
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Start Frontend (New Terminal):
```bash
cd frontend/src
python -m http.server 8000
```

### Open Browser:
- Frontend: http://localhost:8000
- Backend API: http://127.0.0.1:5000

---

## 🔧 Troubleshooting

### ❌ "python is not recognized"
**Solution:** Install Python from python.org or use `py` instead:
```bash
py -m http.server 8000
```

### ❌ Port 8000 already in use
**Solution:** Use different port:
```bash
python -m http.server 8080
```
Then open: http://localhost:8080

### ❌ Port 5000 already in use
**Solution:** Change port in `backend/app.py`:
```python
app.run(debug=True, port=5001, host='127.0.0.1')
```

### ❌ Flask not found
**Solution:** Install dependencies:
```bash
cd backend
pip install Flask Flask-CORS
```

### ❌ Frontend not loading CSS/JS
**Solution:** 
- Make sure you're using a local server (not file://)
- Check browser console for errors
- Verify file paths are correct

---

## ✅ Success Checklist

- [ ] Backend shows: "Server running on: http://127.0.0.1:5000"
- [ ] Frontend shows: "Serving HTTP on 0.0.0.0 port 8000"
- [ ] Browser opens and shows home page
- [ ] No errors in browser console (F12)
- [ ] Can see login/signup buttons

---

## 🎯 Default Login

- **Admin:** admin@cafe.com / admin123
- **User:** Create account through signup

---

## 📁 File Structure

```
smart_cafe_management_system/
├── start-backend.bat    ← Double-click to start backend
├── start-frontend.bat   ← Double-click to start frontend
├── start-all.bat        ← Double-click to start both
├── backend/
│   └── app.py          ← Backend server
└── frontend/
    └── src/
        └── index.html  ← Main page
```

---

## 💡 Tips

1. **Keep both terminals open** - Backend and Frontend need to run simultaneously
2. **Check browser console** (F12) if something doesn't work
3. **Backend must run first** for full functionality
4. **Use Chrome/Firefox** for best compatibility

---

## 🆘 Still Not Working?

1. Check Python is installed: `python --version`
2. Check you're in the right directory
3. Check ports are not blocked by firewall
4. Try restarting your computer
5. Check `START_PROJECT.md` for detailed instructions

---

**Need Help?** Check the console/terminal for error messages!

