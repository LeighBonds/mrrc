---
# create lunr store for search page
---
{% assign metadata = site.metadata | split: ';' %}
{% for m in metadata %}
{% assign items = items | concat: site.data[m] %}
{% endfor %}
{% assign items = items | where_exp: 'item','item.objectid' %}
{%- assign fields = site.data.config-search -%}
var store = [ 
{%- for item in items -%} 
{  
{% for f in fields %}{% if item[f.field] %}{{ f.field | jsonify }}: {{ item[f.field] | normalize_whitespace | replace: '""','"' | jsonify }},{% endif %}{% endfor %} 
"id": {{ item.objectid | jsonify }}

}{%- unless forloop.last -%},{%- endunless -%}
{%- endfor -%}
];
