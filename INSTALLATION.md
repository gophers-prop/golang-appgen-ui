# Frontend Installation Guide

## Quick Setup

1. **Extract & Install**
   ```bash
   cd frontend-only
   npm install
   ```

2. **Configure API**
   ```bash
   cp .env.example .env
   # Edit .env to set your backend API URL
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Backend API Requirements

Your existing backend needs these endpoints:

### Required Endpoints

**POST /api/generate**
- Accepts project configuration
- Returns: `{ success: boolean, downloadUrl?: string, error?: string }`

**GET /api/download/:id**
- Serves generated project as ZIP file

**GET /api/stats**
- Returns: `{ totalGenerated: number }`

### Request Format Example

```json
{
  "goVersion": "1.22",
  "appType": "web",
  "framework": "gin",
  "docker": true,
  "compose": false,
  "baseImage": "alpine",
  "dependencies": ["gorm", "viper"],
  "projectName": "my-go-app",
  "moduleName": "github.com/user/my-go-app",
  "description": "A sample Go application",
  "author": "Developer Name",
  "license": "MIT"
}
```

## Customization

- **API URL**: Edit `src/config/api.ts`
- **UI Theme**: Modify `src/index.css`
- **App Types**: Update `src/lib/types.ts`
- **Branding**: Change header in `src/pages/home.tsx`

## Deployment

Build produces static files in `dist/` - deploy to any static hosting:
- Vercel, Netlify
- AWS S3 + CloudFront
- nginx, Apache
- GitHub Pages

## Support

Check `README.md` for detailed documentation.