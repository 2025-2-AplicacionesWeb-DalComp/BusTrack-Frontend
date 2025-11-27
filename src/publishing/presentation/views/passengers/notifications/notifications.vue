<script>
export default {
  name: 'NotificationsView',
  data() {
    return {
      notifications: [
        {
          id: 1,
          messageKey: 'notifications.busArrival',
          timeKey: 'notifications.timeNow',
          priority: 'high'
        },
        {
          id: 2,
          messageKey: 'notifications.busDelay',
          timeKey: 'notifications.time6Minutes',
          priority: 'medium'
        },
        {
          id: 3,
          messageKey: 'notifications.routeSaved',
          timeKey: 'notifications.time1Hour',
          priority: 'low'
        }
      ]
    };
  }
};
</script>

<template>
  <div class="notifications-container">
    <h1 class="notifications-title">{{ $t('notifications.title') }}</h1>

    <div class="notifications-list">
      <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="['notification-card', notification.priority]"
      >
        <div class="notification-content">
          <p class="notification-text">{{ $t(notification.messageKey) }}</p>
        </div>
        <span class="notification-time">{{ $t(notification.timeKey) }}</span>
      </div>
    </div>
  </div>
</template>


<style scoped>
.notifications-container {
  min-height: 100vh;
  background-color: #f5f5f0;
  padding: 2rem;
}

.notifications-title {
  text-align: center;
  font-size: 2.5rem;
  color: #5c7a3a;
  margin-bottom: 2rem;
  font-weight: 600;
}

.notifications-list {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.notification-card {
  border-radius: 15px;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.notification-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.notification-card.high {
  background-color: #5c7a3a;
  color: #f5f5f0;
}

.notification-card.medium {
  background-color: #d4e896;
  color: #2d3e1f;
}

.notification-card.low {
  background-color: #d4e896;
  color: #2d3e1f;
}

.notification-content {
  flex: 1;
}

.notification-text {
  font-size: 1.25rem;
  margin: 0;
  font-weight: 500;
  line-height: 1.4;
}

.notification-time {
  font-size: 1rem;
  font-weight: 400;
  white-space: nowrap;
  margin-left: 2rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .notifications-container {
    padding: 1rem;
  }

  .notifications-title {
    font-size: 2rem;
  }

  .notification-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .notification-time {
    margin-left: 0;
    align-self: flex-end;
  }
}
</style>