import { Typography } from "antd";
import { NewsMetaBar } from "../NewsMetaBar/NewsMetaBar";
import { NewsDetailsRow } from "../NewsDetailsRow/NewsDetailsRow";
import type { IData_SnippetNews } from "../../types/news";
import type { CheckboxProps } from "antd";

const { Title } = Typography;

type Props = {
  news: IData_SnippetNews;
  onCheckboxChange: CheckboxProps["onChange"];
};

export function NewsHeaderBlock({ news, onCheckboxChange }: Props) {
  return (
    <>
      <NewsMetaBar news={news} onCheckboxChange={onCheckboxChange} />
      <Title level={3} style={{ color: "#0c5ccc", marginTop: "10px" }}>
        {news.TI}
      </Title>
      <NewsDetailsRow news={news} />
    </>
  );
}
