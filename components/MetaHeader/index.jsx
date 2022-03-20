import Head from "next/head";

export const init = {
  title: "Emu Accommodation",
  description:
    "Emu Accommodation - Book your stay in EMU. A grad project built in ITEC403/404",
  keywords:
    "Emu Accommodation, Booking, Accommodation, EMU, ITEC, ITEC403, ITEC404, Graduation Project",
};
export const MetaHeader = ({
  title,
  description,
  icon,
  keywords,
  children,
}) => {
  return (
    <Head>
      <title>{title || init.title}</title>
      <meta name="description" content={description || init.description} />
      <link rel="icon" href={icon || `/favicon.ico`} />
      <meta name="keywords" content={keywords || init.keywords} />
      <meta name="author" content="Obi Fortune" />

      {children || null}

      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="5 days" />
    </Head>
  );
};

export default MetaHeader;
