import { useParams, useNavigate } from "react-router";
import {
  Card,
  Button,
  Typography,
  Checkbox,
  Tag,
  Row,
  Col,
  Space,
  Image,
  Flex,
  Select,
} from "antd";
import type { CheckboxProps } from "antd";
import {
  InfoOutlined,
  GlobalOutlined,
  BookOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { IData_SnippetNews } from "../types/news";

const mockNews: IData_SnippetNews[] = [
  {
    ID: 260855433,
    TI: "Mobile bankers left vulnerable: 47% of UK consumers manage finances on insecure smartphones",
    AB: "Mobile bankers left vulnerable: 47% of UK consumers manage finances on insecure smartphones\nAugust 2020 by Kaspersky\nNew research has revealed that UK consumers carry out online banking on smartphones and devices that are potentially vulnerable to a security breach, despite making sure they keep their desktop or laptop computers safe. In a study commissioned by Kaspersky, nearly half (47%) of smartphone owners who use a banking app don’t protect their mobile device with antivirus or security sof...",
    URL: "https://www.globalsecuritymag.com/Mobile-bankers-left-vulnerable-47,20200819,101944.html",
    DP: "2025-03-06T21:00:00",
    DOM: "globalsecuritymag.com",
    SENT: "negative",
    LANG: "en",
    AU: [],
    FAV: "/favicons/e65d69dc71ab539384fcc63062efdd3d.png",
    KW: [
      {
        value: "antivirus",
        count: 10,
      },
      {
        value: "kaspersky",
        count: 5,
      },
      {
        value: "new",
        count: 1,
      },
    ],
    HIGHLIGHTS: [
      "…20 by <kw>Kaspersky</kw> <kw>New</kw> research has revealed that UK consumers carry out online banking on smartphones and devices that are potentially vulnerable to a security breach, despite making sure they keep their desktop or laptop computers safe. In a study commissioned by <kw>Kaspersky</kw>…",
      "…with <kw>antivirus</kw> or security software. More than half (52%) of UK smartphone owners who access bank accounts with their mobile device are worried about their banking app being hacked if their phone was lost or stolen. Despite that fear, 47%[2] are banking on devices without <kw>antivirus</kw>…",
      "…hone with <kw>antivirus</kw> protection. Surprisingly, one fifth (21%) of adults overall, and one third (33%) of Generation Z, believe their phone can’t be hacked, despite the level of mobile malware attacks rising over the past 12 months. Around two-in-five of those without <kw>antivirus</kw> and s…",
    ],
    REACH: 2392,
    CNTR: "France",
    CNTR_CODE: "FR",
    TRAFFIC: [
      {
        value: "India",
        count: 0.779,
      },
      {
        value: "United States of America",
        count: 0.101,
      },
      {
        value: "Mexico",
        count: 0.036,
      },
    ],
  },
];

// функция для поиска и подсвечивания ключевых слов

const highlightKeywords = (text: string, keywords: string[]) => {
  if (!keywords.length) return text;

  const pattern = new RegExp(`(${keywords.join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, i) =>
    keywords.some((kw) => kw.toLowerCase() === part.toLowerCase()) ? (
      <Typography.Text
        key={i}
        style={{
          backgroundColor: "#0c5ccc",
          fontWeight: 600,
          borderRadius: "4px",
          padding: "2px",
        }}
      >
        {part}
      </Typography.Text>
    ) : (
      part
    )
  );
};

export function NewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = mockNews.find((news) => news.ID === Number(id));

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  if (!news) return <Typography.Text>News not found</Typography.Text>;
  const { Paragraph, Text } = Typography;

  return (
    <div style={{ padding: 24 }}>
      <Button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        Back
      </Button>
      <Card>
        {/* Верхняя панель: дата, охват, страна, иконки */}
        <Row justify="space-between" align="middle">
          <Col>
            <Space size="middle">
              <Text>
                {new Date(news.DP).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
              <Text>
                {news.REACH} <Text type="secondary">Reach</Text>{" "}
              </Text>
              <Text type="secondary">
                Top Traffic:{" "}
                {news.TRAFFIC.map((traffic) => {
                  return (
                    <Text type="secondary" key={traffic.value}>
                      {`${traffic.value} `}
                      <Text>{`${(Number(traffic.count) * 100).toFixed(
                        2
                      )}% `}</Text>
                    </Text>
                  );
                })}
              </Text>
            </Space>
          </Col>

          <Col>
            <Space size="middle">
              <Tag style={{ padding: 4 }} color="#d62929">
                {news.SENT}
              </Tag>
              <Button icon={<InfoOutlined />}></Button>
              <Checkbox onChange={onChange}></Checkbox>
            </Space>
          </Col>
        </Row>
        <Typography.Title
          level={3}
          style={{ color: "#0c5ccc", marginTop: "10px" }}
        >
          {news.TI}
        </Typography.Title>
        <Space>
          <Space style={{ marginRight: "10px" }}>
            <GlobalOutlined />
            <Text>{news.DOM}</Text>
          </Space>
          <Space style={{ marginRight: "10px" }}>
            <Image src={`https://flagsapi.com/${news.CNTR_CODE}/flat/24.png`} />
            <Text>{news.CNTR}</Text>
          </Space>
          <Space style={{ marginRight: "10px" }}>
            <BookOutlined />
            <Text>{news.LANG}</Text>
          </Space>
          <Space style={{ marginRight: "10px" }}>
            {news.AU.length !== 0 &&
              news.AU.map((author) => <Text key={author}>{author}</Text>)}
          </Space>
        </Space>

        <Paragraph style={{ fontSize: "16px", lineHeight: 1.6 }}>
          {highlightKeywords(
            news.AB,
            news.KW.map((k) => k.value)
          )}
        </Paragraph>

        {/* ключевые слова */}

        <div>
          {news.KW.length !== 0 &&
            news.KW.map((kw) => {
              return (
                <Tag
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
              );
            })}
        </div>

        <Space style={{ marginTop: "30px" }}>
          <Typography.Link
            href={news.URL}
            style={{
              color: "0c5ccc",
              padding: "8px 8px",

              borderRadius: "10px",
              backgroundColor: "#ababab",
            }}
          >
            Original Source
          </Typography.Link>
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
              {
                value: "By Relevance",
              },
              {
                value: "From min to max",
              },
              {
                value: "From max to min",
              },
            ]}
          />
        </Flex>

        {/* Список дублирования */}
        <Card style={{ border: "2px solid #0c5ccc" }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Space size="middle">
                <Text>
                  {new Date(news.DP).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
                <Text>
                  {news.REACH} <Text type="secondary">Reach</Text>{" "}
                </Text>
              </Space>
            </Col>

            <Col>
              <Space size="middle">
                <Button icon={<InfoOutlined />}></Button>
                <Checkbox onChange={onChange}></Checkbox>
              </Space>
            </Col>
          </Row>
          <Typography.Title
            level={3}
            style={{ color: "#0c5ccc", marginTop: "10px" }}
          >
            {news.TI}
          </Typography.Title>
          <Space>
            <Space style={{ marginRight: "10px" }}>
              <GlobalOutlined />
              <Text>{news.DOM}</Text>
            </Space>
            <Space style={{ marginRight: "10px" }}>
              <Image
                src={`https://flagsapi.com/${news.CNTR_CODE}/flat/24.png`}
              />
              <Text>{news.CNTR}</Text>
            </Space>
            <Space style={{ marginRight: "10px" }}>
              <BookOutlined />
              <Text>{news.LANG}</Text>
            </Space>
            <Space style={{ marginRight: "10px" }}>
              {news.AU.length !== 0 &&
                news.AU.map((author) => <Text key={author}>{author}</Text>)}
            </Space>
          </Space>
        </Card>
      </Card>
    </div>
  );
}
