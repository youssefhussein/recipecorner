# Setup 
setup laravel https://laravel.com/docs/12.x/installation#installing-php and nodejs

# CHECK TODO.MD & commands.md files for useful stuff

## install dependencies: 
```bash
npm install
```
```bash
composer install 
```
## generate env file
```bash
cp .env.example .env
php artisan key:generate
```

```bash
php artisan migrate
```
## build the frontend (for vite manifest)
```bash
npm run build
```
## then run dev server : 
```bash
composer run dev
```
## for malak

```bash
php artisan serve
```
```bash
bun run dev
```
:D