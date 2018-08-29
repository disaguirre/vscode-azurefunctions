/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzureTreeDataProvider, IActionContext, IAzureNode, IAzureParentNode } from 'vscode-azureextensionui';
import { ext } from '../extensionVariables';
import { nodeUtils } from '../utils/nodeUtils';

export async function createFunctionApp(actionContext: IActionContext, arg?: IAzureParentNode | string): Promise<string> {
    let node: IAzureParentNode;
    if (typeof arg === 'string') {
        node = await nodeUtils.getSubscriptionNode(ext.tree, arg);
    } else if (!arg) {
        node = <IAzureParentNode>await ext.tree.showNodePicker(AzureTreeDataProvider.subscriptionContextValue);
    } else {
        node = arg;
    }

    const funcAppNode: IAzureNode = await node.createChild(actionContext);
    return funcAppNode.id;
}
