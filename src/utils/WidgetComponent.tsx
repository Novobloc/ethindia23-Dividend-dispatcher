import React from "react";
import Card from "utils/card";

const Widget = (props: { icon: JSX.Element; title: string; subtitle: string }) => {
  const { icon, title, subtitle } = props;
  return (
    <Card extra="!flex-row flex-grow items-center">
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
        <div className="bg-lightPrimary p-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">{icon}</span>
        </div>
      </div>

      <div className="h-50 ml-4 flex w-auto flex-col justify-center items-center">
        <p className="font-thin uppercase text-sm text-gray-600">{title}</p>
        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">{subtitle}</h4>
      </div>
    </Card>
  );
};

export default Widget;
