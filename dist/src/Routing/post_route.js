"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_controller_1 = __importDefault(require("../Controllers/post_controller"));
const auth_middleware_1 = __importDefault(require("../Common/auth_middleware"));
/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Posts management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - message
 *         - owner
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the post.
 *         message:
 *           type: string
 *           description: The content/message of the post.
 *         owner:
 *           type: string
 *           description: The owner of the post.
 *         _id:
 *           type: string
 *           description: The post ID.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the post was created.
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of comment IDs associated with the post.
 *         numOfComments:
 *           type: number
 *           description: The number of comments on the post.
 *       example:
 *         title: 'Sample Post'
 *         message: 'This is a sample post content.'
 *         owner: 'JohnDoe'
 *         _id: '5f70a5d259b2b9a2b6c244ae'
 *         createdAt: '2022-01-15T12:34:56Z'
 *         comments:
 *           - '5f70a5d259b2b9a2b6c244af'
 *           - '5f70a5d259b2b9a2b6c244b0'
 *         numOfComments: 2
 */
/**
 * @swagger
 * paths:
 *   /post:
 *     get:
 *       summary: Get all posts
 *       tags: [Posts]
 *       security:
 *        - bearerAuth: []
 *       responses:
 *         '200':
 *           description: An array of posts
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Post'
 *
 *   /post/{id}:
 *     get:
 *       summary: Get a post by ID
 *       tags: [Posts]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the post
 *           schema:
 *             type: string
 *       security:
 *       - bearerAuth: []
 *       responses:
 *         '200':
 *           description: The post
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/', auth_middleware_1.default, post_controller_1.default.getAll.bind(post_controller_1.default));
router.get('/:id', auth_middleware_1.default, post_controller_1.default.getPostsByUserId.bind(post_controller_1.default));
/**
 * @swagger
 * paths:
 *   /post:
 *     post:
 *       summary: Create a new post
 *       tags: [Posts]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       security:
 *        - bearerAuth: []
 *       responses:
 *         '201':
 *           description: The created post
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 error: "Failed to create a new post."
 *                 details: "An internal server error occurred."
 *               requestBody:
 *                 required: true
 *                 content:
 *                   application/json:
 *                     example:
 *                       title: "This is a title"
 *                       content: "This is content"
 *                       owner: "Owner"
 */
router.post('/', auth_middleware_1.default, post_controller_1.default.post.bind(post_controller_1.default));
/**
 * @swagger
 * paths:
 *   /post/{id}:
 *     put:
 *       summary: Update a post by ID
 *       tags: [Posts]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the post
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       security:
 *        - bearerAuth: []
 *       responses:
 *         '200':
 *           description: The updated post
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 *         '500':
 *           description: Error updating post
 *           content:
 *             application/json:
 *               example:
 *                 error: "Failed to update the post."
 *                 details: "An internal server error occurred while updating the post."
 */
router.put('/:id', auth_middleware_1.default, post_controller_1.default.put.bind(post_controller_1.default));
/**
 * @swagger
 * paths:
 *   /post/{id}:
 *     delete:
 *       summary: Delete a post by ID
 *       tags: [Posts]
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the post
 *           schema:
 *             type: string
 *       security:
 *        - bearerAuth: []
 *       responses:
 *         '200':
 *           description: The post was successfully deleted
 *         '500':
 *           description: Error deleting post
 *           content:
 *             application/json:
 *               example:
 *                 error: "Failed to delete the post."
 *                 details: "An internal server error occurred while deleting the post."
 */
router.delete('/:id', auth_middleware_1.default, post_controller_1.default.delete.bind(post_controller_1.default));
exports.default = router;
//# sourceMappingURL=post_route.js.map