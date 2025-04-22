import { Row, Col, Space, Tag, Button, Checkbox, Typography } from "antd";
import { InfoOutlined } from "@ant-design/icons";
import type { CheckboxProps } from "antd";
import type { IData_SnippetNews } from "../../types/news";

const { Text } = Typography;

type Props = {
  news: IData_SnippetNews;
  onCheckboxChange: CheckboxProps["onChange"];
};

export function NewsMetaBar({ news, onCheckboxChange }: Props) {
  return (
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
            {news.REACH} <Text type="secondary"> Reach</Text>
          </Text>
          <Text type="secondary">
            Top Traffic:
            {news.TRAFFIC.map((traffic) => (
              <Text
                style={{ marginLeft: "5px" }}
                type="secondary"
                key={traffic.value}
              >
                {traffic.value}
                <Text style={{ marginLeft: "5px", marginRight: "5px" }}>
                  {`${(Number(traffic.count) * 100).toFixed(2)}%`}
                </Text>
              </Text>
            ))}
          </Text>
        </Space>
      </Col>

      <Col>
        <Space size="middle">
          <Tag style={{ padding: "4px", color: "#d62929" }}>{news.SENT}</Tag>
          <Button icon={<InfoOutlined />} />
          <Checkbox onChange={onCheckboxChange} />
        </Space>
      </Col>
    </Row>
  );
}
