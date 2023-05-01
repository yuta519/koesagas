interface Props {
  tabs: string[];
  currentTab: string;
  onChange: (tag: string) => void;
}

export const Tab = ({ tabs, currentTab, onChange }: Props) => {
  const inactiveTab =
    "mr-2 inline-block p-4 border-b-2 rounded-t-lg border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
  const activeTab =
    "mr-2 inline-block p-4 border-b-2 rounded-t-lg text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500";

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const tab = event.currentTarget.dataset.tab;
    if (tab) {
      onChange(tab);
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <li
              className={tab === currentTab ? activeTab : inactiveTab}
              key={tab}
              data-tab={tab}
              onClick={handleClick}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
