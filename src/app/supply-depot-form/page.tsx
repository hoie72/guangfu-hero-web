"use client";

import AuthCheckSkeleton from "@/features/SupplyDepot/AuthCheckSkeleton";
import UnAuthBlock from "@/features/SupplyDepot/UnAuthBlock";
import Header from "@/features/SupplyDepot/Header";
import { useFetchAllData } from "@/features/SupplyDepot/useFetchAllData";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import FetchSupplyStatus from "@/features/SupplyDepot/FetchSupplyStatus";
import SupplyStation from "@/features/SupplyDepot/SupplyStation";
import SupplyRequirementList from "@/features/SupplyDepot/SupplyRequirementList";
import { Stack, Button } from "@mui/material";
import Wrapper from "@/features/Wrapper";

const SupplyDepotFormPage = () => {
  const { authChecked, authed } = useCheckAuth(); // 檢查登入狀態
  const { supplies, loading, error } = useFetchAllData(authed); // 取得物資資料

  if (!authChecked) {
    return <AuthCheckSkeleton />;
  }
  if (!authed) {
    return <UnAuthBlock />;
  }

  return (
    <Wrapper hideFooter hideBanner hideShare>
      <main className="min-h-dvh bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
          <Header />
          <FetchSupplyStatus
            loading={loading}
            error={error}
            count={supplies?.length || 0}
          />
          <Stack spacing={2} sx={{ mb: 2 }}>
            <SupplyStation />
            <SupplyRequirementList supplies={supplies} />
          </Stack>
          <Button variant="contained" sx={{ width: "100%" }}>
            送出
          </Button>
        </div>
      </main>
    </Wrapper>
  );
};

export default SupplyDepotFormPage;
