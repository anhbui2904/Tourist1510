@echo off
cd /d "%~dp0"
where npm >nul 2>&1
if errorlevel 1 (
  echo Chua tim thay npm. Hay cai Node.js va mo lai file nay.
  pause
  exit /b 1
)
if not exist "node_modules\vite" (
  echo Dang cai dat thu vien...
  call npm install
  if errorlevel 1 (
    echo Cai dat that bai. Hay chup man hinh loi de kiem tra.
    pause
    exit /b 1
  )
)
echo Khoi dong trang web. Mo http://localhost:3000
call npm run dev
pause
