# Authentication Deployment Troubleshooting Guide

## Common Issues and Solutions

### 1. Session Configuration Issues

**Problem**: Sessions not persisting in production
**Solutions**:
- ✅ Set `cookie.secure` to `false` initially (we've fixed this)
- ✅ Add `httpOnly: true` and `sameSite: 'lax'` for security
- ✅ Ensure MongoDB connection is stable for session storage

### 2. Environment Variables

**Required Environment Variables for Production**:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/wonderlust
SECRET=your-strong-session-secret-key
SESSION_CRYPTO_SECRET=your-session-crypto-secret
NODE_ENV=production
PORT=8080
```

### 3. MongoDB Connection Issues

**Check**:
- MongoDB Atlas IP whitelist (allow all IPs: 0.0.0.0/0 for testing)
- Database user permissions (read/write access)
- Connection string format
- Network connectivity from deployment platform

### 4. Debugging Steps

1. **Check Debug Routes** (after deployment):
   - Visit `/debug/auth` to check authentication status
   - Visit `/debug/session` to test session functionality

2. **Check Logs**:
   - Look for MongoDB connection messages
   - Check for session creation/storage errors
   - Monitor authentication route hits

3. **Test Authentication Flow**:
   - Try creating a new account
   - Check if user is created in database
   - Test login with created account
   - Verify session persistence

### 5. Platform-Specific Issues

**Render.com**:
- Ensure all environment variables are set in Render dashboard
- Check build and deploy logs
- Verify Node.js version compatibility

**Heroku**:
- Use `heroku config` to verify environment variables
- Check dyno logs with `heroku logs --tail`

**Railway/Vercel**:
- Verify environment variables in platform dashboard
- Check function/service logs

### 6. Quick Fixes to Try

1. **Reset Sessions**: Clear all sessions in MongoDB
   ```javascript
   // In MongoDB shell or compass
   db.sessions.deleteMany({})
   ```

2. **Test with Demo User**: Visit `/demouser` to create a test user

3. **Check User Creation**: Verify users are being created in MongoDB

4. **Disable HTTPS Cookie**: Temporarily set `cookie.secure: false`

### 7. Security Considerations

After fixing authentication:
- Set strong, unique values for SECRET and SESSION_CRYPTO_SECRET
- Enable HTTPS and set `cookie.secure: true`
- Consider implementing rate limiting for auth routes
- Add CSRF protection if needed

## Testing Checklist

- [ ] MongoDB connection successful
- [ ] Environment variables loaded
- [ ] Session storage working (`/debug/session`)
- [ ] User registration creates user in database
- [ ] User login authenticates successfully
- [ ] Session persists across requests
- [ ] Logout clears session properly
- [ ] Protected routes require authentication