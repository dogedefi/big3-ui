export default `
import React from "react";
import { useModel } from "../plugin-model/useModel";
if (typeof useModel !== "function") {
  throw new Error(
    "[plugin-web3]: useModel is not a function, @umijs/plugin-model is required."
  );
}
interface Props {
  children: React.ReactNode;
}
export default (props: Props) => {
  const { children } = props;
  return children;
};
`
