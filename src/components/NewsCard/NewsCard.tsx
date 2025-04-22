import { Card, Typography, Tag, Space, Flex, Select } from "antd";
import type { CheckboxProps } from "antd";
import type { IData_SnippetNews } from "../../types/news";
import { NewsHeaderBlock } from "../NewsHeaderBlock/NewsHeaderBlock";

const { Paragraph, Text, Link } = Typography;

type Props = {
  news: IData_SnippetNews;
  onCheckboxChange: CheckboxProps["onChange"];
};

const highlightKeywords = (text: string, keywords: string[]) => {
  if (!keywords.length) return text;

  const pattern = new RegExp(`(${keywords.join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, i) =>
    keywords.some((kw) => kw.toLowerCase() === part.toLowerCase()) ? (
      <Text
        key={i}
        style={{
          backgroundColor: "#0c5ccc",
          fontWeight: 600,
          borderRadius: "4px",
          padding: "2px",
        }}
      >
        {part}
      </Text>
    ) : (
      part
    )
  );
};

export function NewsCard({ news, onCheckboxChange }: Props) {
  return (
    <Card>
      <NewsHeaderBlock news={news} onCheckboxChange={onCheckboxChange} />

      <Paragraph
        style={{ fontSize: "16px", lineHeight: 1.6, marginTop: "10px" }}
      >
        {highlightKeywords(
          news.AB,
          news.KW.map((k) => k.value)
        )}
      </Paragraph>

      <div>
        {news.KW.length !== 0 &&
          news.KW.map((kw) => (
            <Tag
              key={kw.value}
              style={{
                padding: "4px 15px",
                marginRight: "10px",
                borderRadius: "20px",
                backgroundColor: "transparent",
                fontSize: "14px",
              }}
            >
              {kw.value} {kw.count}
            </Tag>
          ))}
      </div>

      <Space style={{ marginTop: "30px" }}>
        <Link
          href={news.URL}
          style={{
            color: "#0c5ccc",
            padding: "8px 8px",
            borderRadius: "10px",
            backgroundColor: "#ababab",
          }}
        >
          Original Source
        </Link>
      </Space>

      <Flex
        style={{ marginTop: "20px" }}
        align="center"
        justify="space-between"
      >
        <Text>Duplicates: 192</Text>
        <Select
          defaultValue="By Relevance"
          style={{ width: 160 }}
          popupMatchSelectWidth={false}
          options={[
            { value: "By Relevance" },
            { value: "From min to max" },
            { value: "From max to min" },
          ]}
        />
      </Flex>

      <Card style={{ border: "2px solid #0c5ccc", marginTop: "20px" }}>
        <NewsHeaderBlock news={news} onCheckboxChange={onCheckboxChange} />
      </Card>
    </Card>
  );
}
