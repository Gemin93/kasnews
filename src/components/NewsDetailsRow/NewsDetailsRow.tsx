import { Space, Typography, Image } from "antd";
import { GlobalOutlined, BookOutlined, UserOutlined } from "@ant-design/icons";
import type { IData_SnippetNews } from "../../types/news";

const { Text } = Typography;

type Props = {
  news: IData_SnippetNews;
};

export function NewsDetailsRow({ news }: Props) {
  return (
    <Space style={{ marginTop: 10 }}>
      <Space style={{ marginRight: "10px" }}>
        <GlobalOutlined />
        <Text>{news.DOM}</Text>
      </Space>
      <Space style={{ marginRight: "10px" }}>
        <Image
          src={`https://flagsapi.com/${news.CNTR_CODE}/flat/24.png`}
          alt="flag"
        />
        <Text>{news.CNTR}</Text>
      </Space>
      <Space style={{ marginRight: "10px" }}>
        <BookOutlined />
        <Text>{news.LANG}</Text>
      </Space>
      <Space style={{ marginRight: "10px" }}>
        <UserOutlined />
        {news.AU.length !== 0 &&
          news.AU.map((author) => <Text key={author}>{author}</Text>)}
      </Space>
    </Space>
  );
}
