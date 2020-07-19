export default (req, res) => {
  res.setPreviewData({});

  res.writeHead(307, { Location: req.query.slug });
  res.end();
};
