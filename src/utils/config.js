// Local PC IP address: works on physical Android phones (Wi-Fi/USB) and emulators without requiring adb reverse
export const API_BASE_URL = 'http://192.168.244.44:3000';

// If using USB with `adb reverse tcp:3000 tcp:3000`, localhost:3000 also works:
// export const API_BASE_URL = 'http://localhost:3000';

// If using standard Android Studio emulator without Wi-Fi access:
// export const API_BASE_URL = 'http://10.0.2.2:3000';

// Production cloud backend:
// export const API_BASE_URL = 'https://api-tjwjul5rpq-uc.a.run.app';
