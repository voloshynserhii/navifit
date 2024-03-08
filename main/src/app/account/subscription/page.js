'use client'
import { useAppStore } from '../../../store';

const MySubscription = () => {
  const [state, dispatch] = useAppStore();
  return (
    <main>
      <div>
        My Subscription
        <div>{state.currentUser?.email}</div>
      </div>

    </main>
  );
};

export default MySubscription;