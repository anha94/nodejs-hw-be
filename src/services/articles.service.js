const createError = require("http-errors");
const mongoose = require('mongoose');
const Article = require("../models/articles.model");

const getAll = async () => {
    const result = await Article.aggregate(
        [
            {
                $sort: { 
                    date: -1
                }
            },
            {
            $project: {
                title: 1,
                keyword: 1,
                description: 1,
                date: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$date"
                    }
                }
            }
        }]
    );
    return result;
};

const getById = async (id) => {
    let idObject = new mongoose.Types.ObjectId(id);
    const result = await Article.aggregate(
        [   
            {
                $match: {
                    _id: idObject
                }
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    keyword: 1,
                    description: 1,
                    date: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$date"
                        }
                    }
                }
            }
        ]
    );

    if (!result) {
        throw createError(404, "Article not found");
    }
    return result[0];
};

const create = async (req) => {
    const result = await Article.create(req.body);
    return result;
};

module.exports = {
    getAll,
    getById,
    create
};