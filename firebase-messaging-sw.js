// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyDfIBS2gB4lkRZ1_ZerLk451EVfafrfWSM",
  authDomain: "qtratamal.firebaseapp.com",
  projectId: "qtratamal",
  storageBucket: "qtratamal.appspot.com",
  messagingSenderId: "491056452067",
  appId: "1:491056452067:web:0c8ef019a651cd47c290d6"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// معالجة الإشعارات الواردة عندما يكون التطبيق في الخلفية
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  // تخصيص الإشعار
  const notificationTitle = payload.notification?.title || 'طلب تبرع طارئ';
  const notificationOptions = {
    body: payload.notification?.body || 'هناك حالة طارئة تحتاج إلى تبرع بالدم',
    icon: '/icons/icon-192x192.png',
    data: payload.data
  };

  // عرض الإشعار
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// معالجة النقر على الإشعار
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.click_action || '/')
  );
});