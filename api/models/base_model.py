from django.db import models


class BaseModel(models.Model):
    """
    Abstract Model for all the models.
    Provide this attributes to all the models.
        + active       (boolean)    If the object is active or not (deleted).
        + created       (datetime)  Creation date.
        + modified  (datetime)  Update date.
    """
    active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    createdBy = models.ForeignKey('api.User', on_delete=models.CASCADE, related_name='records_created', null=True)
    updatedBy = models.ForeignKey('api.User', on_delete=models.CASCADE, related_name='records_updated', null=True)

    def __index__(self):
        return id

    class Meta:
        """  Other options """
        abstract = True
        ordering = ['id']
        
    def delete(self, *args):
        self.active = False
        self.save()
        return True
    
    def hard_delete(self, *args, **kwargs):
        super(BaseModel, self).delete(*args, **kwargs)
