from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class CartItem(db.Model):
 
  __tablename__ = 'cart_item'
  
  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')))
  item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')))
  quantity = db.Column(db.Integer)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  users_cart = db.relationship("Cart", back_populates = 'cart')
  cart_items = db.relationship("Item", back_populates = 'itemized_cart')

  def to_dict(self):
    return {
        'id': self.id,
        'cart_id': self.cart_id,
        'item_id': self.item_id,
        'item': self.cart_items.to_dict(),
        'quantity': self.quantity,
        'created_at': self.created_at,
    }
