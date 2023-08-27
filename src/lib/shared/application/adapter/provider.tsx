import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { reduxStore } from "@/lib/shared/application/adapter/store";

export const Providers = (props: PropsWithChildren) => {
  return <Provider store={reduxStore}>{props.children}</Provider>;
}
