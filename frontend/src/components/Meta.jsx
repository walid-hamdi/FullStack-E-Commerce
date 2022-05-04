import { Helmet } from "react-helmet";

export default function Meta({ title, description }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content="sell products online" />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: "Our Shop",
  description: "Selling Products Online",
};
