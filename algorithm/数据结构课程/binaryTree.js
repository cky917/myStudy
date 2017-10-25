function BinaryTree(){
    var Node = function(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }

   var root = null;

    var insertNode = function(node,newNode){
        if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode;
            }else{
                insertNode(node.left,newNode);
            }
        }else{
            if(node.right === null){
                node.right = newNode;
            }else{
                insertNode(node.right,newNode);
            }
        }
    }

    this.insert = function(key){
        var newNode = new Node(key);
        if(root === null){
            root = newNode;
        }else{
            insertNode(root,newNode)
        }
    }
    this.getTree = function(){
        return root;
    }
    //中序遍历
    this.inOrderTraverse = function(callback){
        inOrderTraverseNode(root,callback)
    }
     //前序遍历
    this.preOrderTraverse = function(callback){
        preOrderTraverseNode(root,callback)
    }

    //后序遍历
    this.nextOrderTraverse = function(callback){
        nextOrderTraverseNode(root,callback)
    }
    var inOrderTraverseNode = function(node,callback){
        if(node !== null){
            inOrderTraverseNode(node.left,callback);
            callback(node.key);
            inOrderTraverseNode(node.right,callback);
        }
    }
   
    var preOrderTraverseNode = function(node,callback){
        if(node !== null){
            callback(node.key);
            inOrderTraverseNode(node.left,callback);
            inOrderTraverseNode(node.right,callback);
        }
    }

    var nextOrderTraverseNode = function(node,callback){
        if(node !== null){
            inOrderTraverseNode(node.left,callback);
            inOrderTraverseNode(node.right,callback);
            callback(node.key);
        }
    }
}

var nodes = [8,3,10,1,6,14,4,7,13]

var binaryTree = new BinaryTree();
nodes.forEach(key =>{
    binaryTree.insert(key);
})

binaryTree.inOrderTraverse(function(key){
    console.log(key);
});

binaryTree.preOrderTraverse(function(key){
    console.log(key);
});

binaryTree.nextOrderTraverse(function(key){
    console.log(key);
});