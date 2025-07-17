import * as GovGraph from "@Civilization-Lab/gov-graph";
import * as Next from "next";
import * as React from "react";

const Home: Next.NextPage<
  Next.InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const [selection, setSelection] =
    React.useState<GovGraph.Types.GraphSelection | null>(null);

  return (
    <GovGraph.Context.Provider
      data={props.graphData}
      value={selection}
      onChange={setSelection}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_2fr] min-h-screen">
        <div className="order-2 md:order-1">
          <Sidebar />
        </div>
        <div className="px-4 xl:p-24 order-1 md:order-2 flex items-center justify-center">
          <div className="h-full w-auto">
            <GovGraph.GovGraph />
          </div>
        </div>
      </div>
    </GovGraph.Context.Provider>
  );
};

export const Sidebar = () => {
  const govGraph = GovGraph.Context.useContext();

  return (
    <div className="px-6 py-4 bg-white h-full">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {govGraph.selectedNodes.length === 0 && (
            <h1 className="text-2xl">Explore the graph</h1>
          )}
          {govGraph.selectedNodes.map((node) => (
            <h1 key={node.id} className="text-2xl">
              {node.name}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
};

type PageProps = {
  graphData: GovGraph.Types.GraphData;
};

export const getStaticProps: Next.GetStaticProps<PageProps> = async () => {
  const client = await GovGraph.Api.Client.new({
    apiKey: process.env.CIVLAB_API_KEY!,
  });

  const response = await client.GraphData.get();
  if (!response.ok) throw new Error(response.error);

  return {
    props: {
      graphData: response.data,
    },
  };
};

export default Home;
