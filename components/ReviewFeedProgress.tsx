"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ReviewFeedProgressValue {
  total: number;
  visible: number;
  setVisible: (count: number) => void;
}

const ReviewFeedProgressContext = createContext<ReviewFeedProgressValue | null>(
  null,
);

const INITIAL_PAGE_SIZE = 10;

export function ReviewFeedProgressProvider({
  total,
  children,
}: {
  total: number;
  children: ReactNode;
}) {
  const [visible, setVisibleState] = useState(() =>
    Math.min(INITIAL_PAGE_SIZE, total),
  );

  useEffect(() => {
    setVisibleState((current) => {
      const initial = Math.min(INITIAL_PAGE_SIZE, total);
      if (current > total) {
        return total;
      }
      if (current === 0 && total > 0) {
        return initial;
      }
      return current;
    });
  }, [total]);

  const setVisible = useCallback((count: number) => {
    setVisibleState(count);
  }, []);

  const value = useMemo(
    () => ({
      total,
      visible: Math.min(visible, total),
      setVisible,
    }),
    [total, visible, setVisible],
  );

  return (
    <ReviewFeedProgressContext.Provider value={value}>
      {children}
    </ReviewFeedProgressContext.Provider>
  );
}

export function useReviewFeedProgress() {
  return useContext(ReviewFeedProgressContext);
}
