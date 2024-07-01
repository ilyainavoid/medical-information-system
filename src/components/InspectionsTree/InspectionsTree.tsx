import React, { useEffect, useState } from 'react';
import { Tree, TreeProps } from 'antd';
import { InspectionPreviewModel } from "../../interfaces/inspection-preview-model-interface";
import { getInspectionsChain } from "../../api/inspection/getInspectionsChain";
import { DataNode } from 'antd/es/tree';
import InspectionCard from "../InspectionCard/InspectionCard.tsx";

interface InspectionTreeProps {
    inspections: InspectionPreviewModel[];
}

interface CustomTreeNode extends DataNode {
    hasChain?: boolean;
}

const fetchChildren = async (parentId: string): Promise<InspectionPreviewModel[]> => {
    try {
        const response = await getInspectionsChain(parentId);
        return response;
    } catch (error) {
        console.error(`Не удалось получить дочерние элементы осмотра с id=${parentId}`);
        return [];
    }
};

const InspectionTree: React.FC<InspectionTreeProps> = ({ inspections }) => {
    const [treeData, setTreeData] = useState<CustomTreeNode[]>([]);

    useEffect(() => {
        const initializeTreeData = async () => {
            const initialTreeData = inspections.map((element) => ({
                key: element.id,
                isLeaf: !element.hasNested,
                hasChain: element.hasChain,
                children: [],
            }));
            setTreeData(initialTreeData);

            for (const element of inspections) {
                if (element.hasChain) {
                    const children = await fetchChildren(element.id);
                    const childNodes = children.map((child) => ({
                        title: <InspectionCard inspection={child} onClick={() => console.log(child)} />, // Передаем данные в InspectionCard
                        key: child.id,
                        isLeaf: true,
                    }));
                    setTreeData((origin) =>
                        updateTreeData(origin, element.id, childNodes)
                    );
                }
            }
        };

        initializeTreeData();
    }, [inspections]);

    const onLoadData: TreeProps['loadData'] = async ({ key, children }) => {
        if (children) {
            return;
        }

        const newChildren = await fetchChildren(key as string);
        const childNodes = newChildren.map((child) => ({
            title: <InspectionCard inspection={child} onClick={() => console.log(child)} />, // Передаем данные в InspectionCard
            key: child.id,
            isLeaf: true,
        }));

        setTreeData((origin) => updateTreeData(origin, key as string, childNodes));
    };

    return <Tree loadData={onLoadData} treeData={treeData} />;
};

const updateTreeData = (list: CustomTreeNode[], key: React.Key, children: CustomTreeNode[]): CustomTreeNode[] =>
    list.map((node) => {
        if (node.key === key) {
            return {
                ...node,
                children,
            };
        }
        if (node.children) {
            return {
                ...node,
                children: updateTreeData(node.children as CustomTreeNode[], key, children),
            };
        }
        return node;
    });

export default InspectionTree;
