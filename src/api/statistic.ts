import axios from "axios";
import { get } from "http";
import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue-sonner";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export interface Statistic {
  code: number;
  message: string;
  data: number;
}

export interface ChartResponse {
  code: number;
  message: string;
  data: {}[][];
}

export const statistics = defineStore("statistic", () => {
  const statisticActive = ref<Statistic>({
    code: 0,
    message: "",
    data: 0,
  });

  const statisticCancel = ref<Statistic>({
    code: 0,
    message: "",
    data: 0,
  });

  const statisticCheckin = ref<Statistic>({
    code: 0,
    message: "",
    data: 0,
  });

  const statisticCheckout = ref<Statistic>({
    code: 0,
    message: "",
    data: 0,
  });

  const statisticRoomActive = ref<Statistic>({
    code: 0,
    message: "",
    data: 0,
  });

  const statisticRoomInactive = ref<Statistic>({
    code: 0,
    message: "",
    data: 0,
  });

  const statisticChart = ref<ChartResponse>({
    code: 0,
    message: "",
    data: [],
  });

  const getStatisticActive = async (): Promise<Statistic> => {
    try {
      const response = await axios.get<Statistic>(
        `${baseUrl}/office/statistics/active-room-percentage`,
        { withCredentials: true }
      );
      statisticActive.value = response.data;
      return response.data;
    } catch (error) {
      toast.error("Error fetching statistic", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
      throw error;
    }
  };

  const getStatisticCancel = async (): Promise<Statistic> => {
    try {
      const response = await axios.get<Statistic>(
        `${baseUrl}/office/statistics/cancel-booking-percentage`,
        { withCredentials: true }
      );
      statisticCancel.value = response.data;
      return response.data;
    } catch (error) {
      toast.error("Error fetching statistic", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
      throw error;
    }
  };

  const getStatisticCheckin = async (): Promise<Statistic> => {
    try {
      const response = await axios.get<Statistic>(
        `${baseUrl}/office/statistics/check-in-today-bookings`,
        { withCredentials: true }
      );
      statisticCheckin.value = response.data;
      return response.data;
    } catch (error) {
      toast.error("Error fetching statistic", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
      throw error;
    }
  };

  const getStatisticCheckout = async (): Promise<Statistic> => {
    try {
      const response = await axios.get<Statistic>(
        `${baseUrl}/office/statistics/check-out-today-bookings`,
        { withCredentials: true }
      );
      statisticCheckout.value = response.data;
      return response.data;
    } catch (error) {
      toast.error("Error fetching statistic", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
      throw error;
    }
  };

  const getStatisticRoomActive = async (): Promise<Statistic> => {
    try {
      const response = await axios.get<Statistic>(
        `${baseUrl}/office/statistics/count-active-rooms`,
        { withCredentials: true }
      );
      statisticRoomActive.value = response.data;
      return response.data;
    } catch (error) {
      toast.error("Error fetching statistic", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
      throw error;
    }
  };

  const getStatisticRoomInactive = async (): Promise<Statistic> => {
    try {
      const response = await axios.get<Statistic>(
        `${baseUrl}/office/statistics/count-inactive-rooms`,
        { withCredentials: true }
      );
      statisticRoomInactive.value = response.data;
      return response.data;
    } catch (error) {
      toast.error("Error fetching statistic", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
      throw error;
    }
  };

  const getChartData = async (year: string): Promise<ChartResponse> => {
    try {
      const response = await axios.get<ChartResponse>(
        `${baseUrl}/office/statistics/revenue-by-year-and-month/${year}`,
        { withCredentials: true }
      );
      statisticChart.value = response.data;
      return response.data;
    } catch (error) {
      toast.error("Error fetching statistic", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
      throw error;
    }
  };

  return {
    statisticActive,
    getStatisticActive,
    statisticCancel,
    getStatisticCancel,
    statisticCheckin,
    getStatisticCheckin,
    statisticCheckout,
    getStatisticCheckout,
    statisticRoomActive,
    getStatisticRoomActive,
    statisticRoomInactive,
    getStatisticRoomInactive,
    statisticChart,
    getChartData,
  };
});
