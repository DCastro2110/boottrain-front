import type { GetHomeInfo200 } from "@/lib/api/booTrainAPI";
import { getHomeInfo } from "@/lib/api/booTrainAPI";

export async function getHomeInfoData(): Promise<GetHomeInfo200 | null> {
  try {
    const response = await getHomeInfo();

    if (response.status === 200) {
      return response.data;
    }

    console.error(`Home info API returned status ${response.status}`);
    return null;
  } catch (error) {
    console.error("Failed to fetch home info:", error);
    return null;
  }
}