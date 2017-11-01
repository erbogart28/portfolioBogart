class ContactForm < MailForm::Base
  attributes :name,  :validate => true
  attributes :email, :validate => /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
  attributes :type,  :validate => ["General", "Interface bug"]
  attributes :message
  attributes :screenshot, :attachment => true, :validate => :interface_bug?
  attributes :nickname,   :captcha => true

  def interface_bug?
    if type == 'Interface bug' && screenshot.nil?
      self.errors.add(:screenshot, "can't be blank on interface bugs")
    end
  end
end

c = ContactForm.new(:nickname => 'not_blank', :email => 'your@email.com', :name => 'José')
c.valid?  #=> true
c.spam?   #=> true  (raises an error in development, to remember you to hide it)
c.deliver  #=> false (just delivers if is not a spam and is valid, raises an error in development)

c = ContactForm.new(:email => 'invalid')
c.valid?               #=> false
c.errors.inspect       #=> { :name => :blank, :email => :invalid }
c.errors.full_messages #=> [ "Name can't be blank", "Email is invalid" ]

c = ContactForm.new(:name => 'José', :email => 'your@email.com')
c.deliver